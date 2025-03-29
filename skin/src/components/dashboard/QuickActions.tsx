
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, CreditCard, BarChart3 } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50"
          >
            <ArrowUpRight className="h-5 w-5 text-uphold-primary" />
            <span className="text-sm font-medium">Send</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50"
          >
            <ArrowDownLeft className="h-5 w-5 text-uphold-primary" />
            <span className="text-sm font-medium">Receive</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50"
          >
            <CreditCard className="h-5 w-5 text-uphold-primary" />
            <span className="text-sm font-medium">Add Card</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-white hover:bg-gray-50"
          >
            <BarChart3 className="h-5 w-5 text-uphold-primary" />
            <span className="text-sm font-medium">Analytics</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
