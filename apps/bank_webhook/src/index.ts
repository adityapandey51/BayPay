import express from "express"
import db from "@repo/db/client"

const app=express()
app.use(express.json())


app.post("/hdfc",async(req,res)=>{
    const paymentInformation:{
        token:string;
        userId:string;
        amount:string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.upsert({
                where:{
                    userId:Number(paymentInformation.userId)
                },
                update:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                },
                create:{
                    amount:Number(paymentInformation.amount),
                    userId:Number(paymentInformation.userId),
                    locked:0
                }
            }),
            db.onRanmpTransactions.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data:{
                   status:"Success"
                }
            })
        ])

        res.json({
            message:"Captured"
        })
    } catch (error) {

        res.status(411).json({
            message: "Error while processing webhook",
            error
        })
    }
})

app.listen(8080)