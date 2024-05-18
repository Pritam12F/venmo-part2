"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function onRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const token = Math.floor(Math.random() * 10000).toString();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "Not authorized",
    };
  }

  try {
    const transaction = await prisma.onRampTransaction.create({
      data: {
        amount,
        provider,
        status: "Processing",
        startTime: new Date(),
        userId: Number(userId),
        token,
      },
    });

    return {
      message: "OnRampTransaction added",
    };
  } catch (err) {
    return {
      message: "Some error occured",
    };
  }
}

export async function p2phandler(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "Not authorized",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User doesn't exist",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;

      const checkBalance = await tx.balance.findFirst({
        where: {
          userId: Number(userId),
        },
      });

      if (!checkBalance || checkBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: {
          userId: Number(userId),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });

      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      await tx.p2pTransfer.create({
        data: {
          toUserId: toUser.id,
          fromUserId: Number(userId),
          amount,
          timestamp: new Date(),
        },
      });
    });

    return {
      message: "Transaction was successful",
    };
  } catch (err) {
    return {
      message: "Some error occured while making the transaction",
    };
  }
}
