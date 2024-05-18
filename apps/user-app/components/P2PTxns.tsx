"use client";

import { Card } from "@repo/ui/card";
import { useGetAllP2P } from "../app/hooks/useGetAllp2p";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const P2PTxns = () => {
  const session = useSession();
  //@ts-ignore
  const id = session.data?.user.id;
  if (!id) {
    redirect("/dashboard");
  }
  const transactions = useGetAllP2P();
  return (
    <Card title="Recent transactions">
      {transactions.map((el) => {
        return (
          <div className="flex p-5">
            <div>
              <div className="text-xl font-bold text-slate-500 min-w-72">
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
