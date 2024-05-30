"use client";

import { Card } from "@repo/ui/card";
import { useGetAllP2P } from "../app/hooks/useGetAllp2p";

export const P2PTxns = ({ title }: { title: string }) => {
  const { transactions, id } = useGetAllP2P();
  if (transactions.length === 0) {
    return (
      <Card title={title}>
        <div className="p-5">No recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title={title}>
      {transactions.map((el) => {
        return (
          <div className="flex p-5">
            <div>
              <div className="text-lg font-bold text-slate-500 min-w-72">
                {id == el.fromUserId ? "Sent INR" : "Recieved INR"}
              </div>
              <div className="text-sm">{el.timestamp.toDateString()}</div>
              <div className="text-sm">
                {el.timestamp.toTimeString().substring(0, 8)}
              </div>
            </div>
            <div>{el.amount / 100}</div>
          </div>
        );
      })}
    </Card>
  );
};
