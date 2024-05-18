"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { z } from "zod";

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

export async function p2phandler(amount, timestamp, fromUserId, toUserId) {
  const p2pSchema = z.object({
    amount: z.number(),
    timestamp: z.number(),
    fromUserId: z.number(),
    toUserId: z.number(),
  });

  const { success } = p2pSchema.safeParse({
    amount,
    timestamp,
    fromUserId,
    toUserId,
  });

  if (!success) {
    return {
      message: "Invalid inputs",
    };
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
}
