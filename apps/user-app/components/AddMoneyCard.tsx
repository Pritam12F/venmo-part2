"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { onRampTransaction } from "../app/lib/actions";
import Alert from "./Notification";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleClose = () => {
    setSuccess(false);
    setError(false);
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => {
            setAmount(Number(e));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        {success ? (
          <Alert
            title="Success"
            message="Successfully added money"
            handleClose={handleClose}
          />
        ) : null}
        {error ? (
          <Alert
            title="Error"
            message="Error adding transaction"
            handleClose={handleClose}
          />
        ) : null}
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              setSuccess(false);
              setError(false);
              if (amount !== 0 && redirectUrl) {
                try {
                  await onRampTransaction(amount, redirectUrl);
                  setSuccess(true);
                } catch (err) {
                  setError(true);
                }
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
