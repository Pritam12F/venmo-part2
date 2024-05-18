"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";

export const Peer2Peer = () => {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");

  return (
    <div className="min-w-96">
      <Card title="Send">
        <TextInput
          label={"Number"}
          placeholder={"Enter number"}
          onChange={(e) => {
            setNumber(e);
          }}
        />
        <TextInput
          label={"Amount"}
          placeholder={"Enter amount"}
          onChange={(e) => {
            setAmount(e);
          }}
        />
        <div className="mt-5 flex justify-center">
          <Button onClick={() => {}}>Send</Button>
        </div>
      </Card>
    </div>
  );
};
