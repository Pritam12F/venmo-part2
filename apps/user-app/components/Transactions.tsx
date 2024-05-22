import { Card } from "@repo/ui/card";
import { findP2Ptranx, getOnRampTransactions } from "../app/lib/actions";

export const Transactions = async () => {
  const { data, userId } = await findP2Ptranx();
  const onramps = await getOnRampTransactions();
  const latest_p2p = data.reduce((prev: any, curr: any) =>
    curr.timestamp > prev.timestamp ? curr : prev
  );
  const latest_onramp = onramps.reduce((prev: any, curr: any) =>
    curr.time > prev.time ? curr : prev
  );

  return (
    <Card title="Transaction History">
      <div className="p-8 space-y-10">
        <div className="transaction-details grid grid-cols-4 my-2">
          <h3 className="text-lg font-semibold col-span-3">
            Latest On Ramp Transaction
          </h3>
          <div className="transaction-info">
            <div className="amount text-slate-500">
              {latest_onramp.amount / 100} INR
            </div>
            <div className="date">
              On ramped on: {latest_onramp.time.toDateString()}
            </div>
          </div>
        </div>
        <div className="transaction-details grid grid-cols-4 my-2">
          <h3 className="text-lg font-semibold col-span-3">
            Latest Peer to Peer Transaction
          </h3>
          <div className="transaction-info">
            <div className="amount text-slate-500">
              {latest_p2p.amount / 100} INR
            </div>
            <div className="date">
              {latest_p2p.fromUserId === userId ? "Sent on: " : "Received on: "}
              {latest_p2p.timestamp.toDateString()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
