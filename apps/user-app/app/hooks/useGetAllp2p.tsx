"use client";

import { useState, useEffect } from "react";
import { findP2Ptranx } from "../lib/actions";

export const useGetAllP2P = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, userId } = await findP2Ptranx();
      setTransactions(data);
      setId(userId);
    };
    fetchData();
  }, []);

  return { transactions, id };
};
