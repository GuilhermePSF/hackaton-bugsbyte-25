
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Filter,
  Search,
} from "lucide-react";

const mockTransactions = [
  {
    id: "TX12345",
    type: "incoming",
    description: "Deposit from Bank",
    amount: "1,250.00",
    currency: "USD",
    date: "2023-12-15 10:45:23",
    status: "completed",
  },
  {
    id: "TX12346",
    type: "outgoing",
    description: "Bitcoin Purchase",
    amount: "500.00",
    currency: "USD",
    date: "2023-12-14 14:30:45",
    status: "completed",
  },
  {
    id: "TX12347",
    type: "incoming",
    description: "Bitcoin Sale",
    amount: "0.05",
    currency: "BTC",
    date: "2023-12-12 09:15:33",
    status: "completed",
  },
  {
    id: "TX12348",
    type: "outgoing",
    description: "Withdrawal to Bank",
    amount: "750.00",
    currency: "USD",
    date: "2023-12-10 16:20:10",
    status: "pending",
  },
  {
    id: "TX12349",
    type: "outgoing",
    description: "Euro Transfer",
    amount: "500.00",
    currency: "EUR",
    date: "2023-12-08 11:30:22",
    status: "completed",
  },
  {
    id: "TX12350",
    type: "incoming",
    description: "Ethereum Sale",
    amount: "1.25",
    currency: "ETH",
    date: "2023-12-05 08:45:11",
    status: "completed",
  },
  {
    id: "TX12351",
    type: "outgoing",
    description: "Ethereum Purchase",
    amount: "300.00",
    currency: "USD",
    date: "2023-12-03 13:15:42",
    status: "completed",
  },
  {
    id: "TX12352",
    type: "incoming",
    description: "Deposit from Bank",
    amount: "2,000.00",
    currency: "USD",
    date: "2023-12-01 09:30:15",
    status: "completed",
  },
];

export function Transactions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">
                Transaction History
              </CardTitle>
              <CardDescription>
                View and manage all your transactions
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-uphold-primary focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter size={16} />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download size={16} />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium text-xs">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        {transaction.type === "incoming" ? (
                          <ArrowDownLeft className="h-4 w-4 mr-1 text-uphold-success" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 mr-1 text-uphold-danger" />
                        )}
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell
                      className={`${
                        transaction.type === "incoming"
                          ? "text-uphold-success"
                          : "text-uphold-danger"
                      }`}
                    >
                      {transaction.type === "incoming" ? "+" : "-"}
                      {transaction.amount} {transaction.currency}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">8</span> of{" "}
                <span className="font-medium">20</span> transactions
              </div>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-uphold-primary text-white"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
