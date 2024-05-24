"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { signInSchema, signUpSchema } from "../../types";

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
    await prisma.onRampTransaction.create({
      data: {
        amount,
        provider,
        status: "Processing",
        startTime: new Date(),
        userId: Number(userId),
        token,
      },
    });

    await prisma.$transaction([
      prisma.balance.updateMany({
        where: {
          userId: Number(userId),
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      }),
      prisma.onRampTransaction.updateMany({
        where: {
          token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

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
    return prisma.$transaction(async (tx: any) => {
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

      const newBal = await tx.p2pTransfer.create({
        data: {
          toUserId: toUser.id,
          fromUserId: Number(userId),
          amount,
          timestamp: new Date(),
        },
      });

      return newBal;
    });
  } catch (err) {
    return {
      message: "Some error occured while making the transaction",
    };
  }
}

export const findP2Ptranx = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const data = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { toUserId: { equals: Number(userId) } },
        { fromUserId: { equals: Number(userId) } },
      ],
    },
  });
  return { data, userId, user: session.user };
};

export async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export const createUser = async (
  number: string,
  password: string,
  email: string,
  username: string
) => {
  try {
    await prisma.user.create({
      data: {
        number,
        password,
        email,
        name: username,
      },
    });
  } catch (err) {
    throw new Error("Error occured signing up user ");
  }
};

export const validSignIn = (
  phone: FormDataEntryValue | null,
  password: FormDataEntryValue | null
) => {
  const { success } = signInSchema.safeParse({
    number: String(phone),
    password: String(password),
  });

  return success ? true : false;
};

export const validSignup = (
  phone: string,
  password: string,
  email: string,
  username: string
) => {
  const { success } = signUpSchema.safeParse({
    number: phone,
    password,
    username,
    email,
  });

  return success ? true : false;
};
