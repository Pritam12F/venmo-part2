import { P2PTxns } from "../../../components/P2PTxns";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getOnRampTransactions } from "../../lib/actions";

export default async function () {
  const transactions = await getOnRampTransactions();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 w-full my-auto">
      <OnRampTransactions transactions={transactions} />
      <P2PTxns title="P2P transactions" />
    </div>
  );
}
