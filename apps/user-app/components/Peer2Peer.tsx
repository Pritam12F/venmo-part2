"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2phandler } from "../app/lib/actions";
import Alert from "./Notification";
import { tuple } from "zod";

export const Peer2Peer = () => {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleClose = () => {
    setSuccess(false);
    setError(false);
  };

  return (
    <div className="min-w-96">
      {success ? (
        <Alert
          title="Success"
          message="Successfully sent money"
          handleClose={handleClose}
        />
      ) : null}
      {error ? (
        <Alert
          title="Error"
          message="Couldn't sent money"
          handleClose={handleClose}
        />
      ) : null}
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
          <Button
            onClick={async () => {
              setSuccess(false);
              setError(false);
              try {
                await p2phandler(number, Number(amount));
                setSuccess(true);
              } catch (err) {
                setError(true);
              }
            }}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};
