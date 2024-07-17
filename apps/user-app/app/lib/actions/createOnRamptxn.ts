"use server"

import { getServerSession } from "next-auth"
import db from "@repo/db/client"
import { authOptions } from "../auth";

export const createOnRamptxn= async (amount: number, provider: string )=>{
        const session= await getServerSession(authOptions);

        if (!session?.user || !session.user?.id) {
            return {
                message: "Unauthenticated request"
            }
        }

        // Ideally the token should come from the banking provider (hdfc/axis)
        const token = (Math.random() * 1000).toString();
        try {
            await db.onRanmpTransactions.create({
                data: {
                    provider,
                    status: "Processing",
                    startTime: new Date(),
                    token: token,
                    userId: Number(session?.user?.id),
                    amount: amount
                }
            });
            return {
                message:"Done"
            }
        } catch (error) {
            return {
                message:"ERROR"
            }
        }
}