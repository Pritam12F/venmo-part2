import { P2PTxns } from "../../../components/P2PTxns";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getOnRampTransactions } from "../../lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  const transactions = await getOnRampTransactions();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 w-full my-auto">
      <OnRampTransactions transactions={transactions} />
      <P2PTxns title="P2P transactions" />
    </div>
  );
}
