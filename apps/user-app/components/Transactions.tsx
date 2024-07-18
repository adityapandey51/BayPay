import { Card } from "@repo/ui/card"

export const Transactions = ({
    transactions,
    title
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status?: string,
        provider?: string,
        fromUser?: number,
        toUser?: number
    }[],
    title: string
}) => {
    if (!transactions.length) {
        return <Card title={title}>
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title={title}>
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {title==="Sent Payments"?"Sent INR":"Received INR"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}

export const dynamic = "force-dynamic";