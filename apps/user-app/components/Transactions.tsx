import { Card } from "@repo/ui/card";
import { findP2Ptranx, getOnRampTransactions } from "../app/lib/actions";

export const Transactions = async () => {
  const { data, userId } = await findP2Ptranx();
  const onramps = await getOnRampTransactions();
  const latest_p2p = data.filter((prev: any, curr: any) =>
    curr.timestamp > prev.timestamp ? curr : prev
  );
  const latest_onramp = onramps.filter((prev: any, curr: any) =>
    curr.time > prev.time ? curr : prev
  );

  const l2p = latest_p2p[0];
  const onr = latest_onramp[0];

  return (
    <Card title="Transaction History">
      <div className="p-8 space-y-10">
        <div className="transaction-details grid grid-cols-4 my-2">
          <h3 className="text-lg font-semibold col-span-3">
            Latest On Ramp Transaction
          </h3>
          <div className="transaction-info">
            <div className="amount text-slate-500">
              {onr?.amount ? onr?.amount / 100 : null} INR
            </div>
            <div className="date">On ramped on: {onr?.time.toDateString()}</div>
          </div>
        </div>
        <div className="transaction-details grid grid-cols-4 my-2">
          <h3 className="text-lg font-semibold col-span-3">
            Latest Peer to Peer Transaction
          </h3>
          <div className="transaction-info">
            <div className="amount text-slate-500">
              {l2p?.amount ? l2p?.amount / 100 : null} INR
            </div>
            <div className="date">
              {l2p?.fromUserId === userId ? "Sent on: " : "Received on: "}
              {l2p?.timestamp.toDateString()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
