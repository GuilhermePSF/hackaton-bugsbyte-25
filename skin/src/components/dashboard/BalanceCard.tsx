
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

type BalanceCardProps = {
  title: string;
  balance: string;
  change?: {
    value: string;
    percentage: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
};

export function BalanceCard({ title, balance, change, icon }: BalanceCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon || <DollarSign className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{balance}</div>
        {change && (
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`text-xs ${
                change.isPositive ? "text-uphold-success" : "text-uphold-danger"
              }`}
            >
              {change.isPositive ? <ArrowUpRight className="h-3 w-3 inline" /> : <ArrowDownRight className="h-3 w-3 inline" />}
              {" "}{change.value} ({change.percentage})
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
