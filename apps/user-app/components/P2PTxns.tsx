"use client";

import { Card } from "@repo/ui/card";
import { useGetAllP2P } from "../app/hooks/useGetAllp2p";

export const P2PTxns = () => {
  const transactions = useGetAllP2P();
  return (
    <Card title="Recent transactions">{JSON.stringify(transactions)}</Card>
  );
};
