import { getServerSession } from "next-auth";
import { Transactions } from "../../../components/Transactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";


async function receivedtxns(){
    const session=await getServerSession(authOptions);

   const txns=await prisma.p2pTransfer.findMany({
    where:{
        toUserId:Number(session.user.id)
    }
   })

   return txns.map((t)=>({
    time:t.timestamp,
    amount:t.amount,
    fromUser:t.fromUserId,
    toUser:t.toUserId
   }))

}

async function doneTxn(){
    const session=await getServerSession(authOptions);

   const txns=await prisma.p2pTransfer.findMany({
    where:{
        fromUserId:Number(session.user.id)
    }
   })

   return txns.map((t)=>({
    time:t.timestamp,
    amount:t.amount,
    fromUser:t.fromUserId,
    toUser:t.toUserId
   }))

}

export default async function(){
    const session=await getServerSession(authOptions)
    
    if(!session){
        redirect("/api/auth/signin")
    }

    const txns=await receivedtxns()
    const doneTxns=await doneTxn()

    return (
      <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
          Transactions
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div className="pt-4">
            <div className="mb-4">
            <Transactions transactions={txns} title="Received Payments" />
            </div>
            <div>
            <Transactions transactions={doneTxns} title="Sent Payments" />
            </div>
          </div>
        </div>
      </div>
    );
}

export const dynamic = "force-dynamic";

