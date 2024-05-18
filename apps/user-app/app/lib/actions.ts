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
    await prisma.$transaction([
      prisma.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`,
      prisma.balance.update({
        where: {
          userId,
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      }),

      prisma.balance.update({
        where: {
          userId: Number(to),
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      }),

      prisma.p2pTransfer.create({
        data: {
          amount,
          timestamp: new Date(),
          fromUserId: userId,
          toUserId: Number(to),
        },
      }),
    ]);

    return {
      message: "Transaction was successful",
    };
  } catch (err) {
    return {
      message: "Some error occured while making the transaction",
    };
  }
}
