"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";

export async function onRampTransaction(amount: number, provider: string) {
  const session = await getServerSession();
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
        userId,
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
