"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { findP2Ptranx } from "../lib/actions";
import { Numans } from "next/font/google";

export const useGetAllP2P = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  const session = useSession();
  //@ts-ignore
  const id = session.data?.user.id;

  useEffect(() => {
    const fetchData = async () => {
      const data = await findP2Ptranx(Number(id));
      setTransactions(data);
    };
    fetchData();
  }, []);

  return transactions;
};
