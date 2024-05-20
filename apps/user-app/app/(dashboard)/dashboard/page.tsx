import { BalanceCard } from "../../../components/BalanceCard";
import { UserDetails } from "../../../components/UserDetails";
import { Transactions } from "../../../components/Transactions";
import { getBalance } from "../../lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const balance = await getBalance();
  return (
    <div className="grid grid-cols-5 w-full grid-rows-2">
      <div className="col-span-5 w-full grid grid-cols-2 gap-x-20 my-4">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <UserDetails />
      </div>
      <div className="col-span-5 ">
        <Transactions />
      </div>
    </div>
  );
}
