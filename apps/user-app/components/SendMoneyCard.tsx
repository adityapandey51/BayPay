"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2ptransfer";

export const SendMoney=()=>{
    const [amount,setAmount]=useState("");
    const [phone,setPhone]=useState("")

    return (
      <div className="h-[90vh]">
        <Center>
          <Card title="Send">
            <div className="min-w-72 pt-2">
              <TextInput
                placeholder="Enter the number"
                label="Number"
                onChange={(value: string) => {
                  setPhone(value);
                }}
              />
              <TextInput
                placeholder="Enter the amount"
                label="Amount"
                onChange={(value: string) => {
                  setAmount(value);
                }}
              />
              <div className="pt-4 flex justify-center">
              <Button onClick={async() => {
                const res= await p2pTransfer(phone,Number(amount)*100)
                alert(res.message)
              }}>Send</Button>
              </div>
              
            </div>
          </Card>
        </Center>
      </div>
    );
}