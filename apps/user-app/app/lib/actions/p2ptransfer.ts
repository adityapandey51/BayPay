"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const p2pTransfer= async (phone:string, value:number) => {

    const session= await getServerSession(authOptions)

    if(!session?.user || !session?.user?.id){
        return {
            message:"You are not logged in"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: phone
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
   
    try {
       await prisma.$transaction(async(txn)=>{
            await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;
            const fromBalance=await txn.balance.findUnique({
                where: { userId: Number(session.user.id) },
            })

            if (!fromBalance || (fromBalance.amount < value)) {
                throw new Error('Insufficient funds');
              }

              await txn.balance.update({
                where:{
                    userId: Number(session.user.id)
                },
                data:{
                    amount:{
                        decrement:value
                    }
                }
              })

              await txn.balance.update({
                where:{
                    userId:toUser.id
                },
                data:{
                    amount:{
                        increment:value
                    }
                }
              })
       }) 

       return {
        message:"Transaction Successful"
       }
    } catch (error) {
        return {
            message:"ERROR",
        }
    }
}