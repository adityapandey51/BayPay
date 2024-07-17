"use client";

import { useRecoilValue } from "recoil";
import { balanceAtom } from "./atoms/balance";
export default function() {
  const balance = useRecoilValue(balanceAtom)
  return <div>
    hi there {balance}
  </div>
}