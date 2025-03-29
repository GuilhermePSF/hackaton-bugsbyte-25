
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Transaction = {
  id: string;
  type: "incoming" | "outgoing";
  description: string;
  amount: string;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed";
};

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
          <CardDescription>
            Your recent transaction history
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Filter size={16} />
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    transaction.type === "incoming"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {transaction.type === "incoming" ? (
                    <ArrowDownLeft
                      className="h-5 w-5 text-uphold-success"
                    />
                  ) : (
                    <ArrowUpRight
                      className="h-5 w-5 text-uphold-danger"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      transaction.type === "incoming"
                        ? "text-uphold-success"
                        : "text-uphold-danger"
                    }`}
                  >
                    {transaction.type === "incoming" ? "+" : "-"}
                    {transaction.amount} {transaction.currency}
                  </p>
                  <p
                    className={`text-xs ${
                      transaction.status === "completed"
                        ? "text-green-600"
                        : transaction.status === "pending"
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="link" className="text-uphold-primary">
            View all transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
