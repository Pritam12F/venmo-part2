import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { UserDetails } from "../../../components/UserDetails";

async function getBalance() {
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

export default async function () {
  const balance = await getBalance();
  return (
    <div className="grid grid-cols-5 w-full grid-rows-2">
      <div className="col-span-5 w-full grid grid-cols-2 gap-x-20 my-4">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <UserDetails />
      </div>
    </div>
  );
}
