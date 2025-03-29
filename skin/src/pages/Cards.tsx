
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Plus, Settings } from "lucide-react";

const mockCards = [
  {
    id: "card1",
    name: "Virtual Debit Card",
    number: "**** **** **** 4523",
    expiry: "09/26",
    balance: "$5,245.00",
    type: "Visa",
    currency: "USD",
    status: "active",
  },
  {
    id: "card2",
    name: "Physical Debit Card",
    number: "**** **** **** 7891",
    expiry: "11/25",
    balance: "€940.00",
    type: "Mastercard",
    currency: "EUR",
    status: "active",
  },
  {
    id: "card3",
    name: "Business Card",
    number: "**** **** **** 5678",
    expiry: "03/27",
    balance: "$1,200.00",
    type: "Visa",
    currency: "USD",
    status: "inactive",
  },
];

export function Cards() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Cards</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCards.map((card) => (
            <Card
              key={card.id}
              className={`shadow-sm overflow-hidden ${
                card.status === "inactive"
                  ? "opacity-70"
                  : ""
              }`}
            >
              <div className={`h-12 ${
                card.type === "Visa" 
                  ? "bg-gradient-to-r from-uphold-dark to-uphold-primary" 
                  : "bg-gradient-to-r from-uphold-primary to-blue-400"
              }`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">
                    {card.name}
                  </CardTitle>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full uppercase">
                    {card.type}
                  </span>
                </div>
                <CardDescription>{card.currency} Card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-8 w-8 text-uphold-primary" />
                  <div>
                    <p className="text-sm font-medium">{card.number}</p>
                    <p className="text-xs text-gray-500">Valid thru: {card.expiry}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <p className="text-xl font-bold">{card.balance}</p>
                </div>
                {card.status === "inactive" && (
                  <div className="text-sm text-uphold-danger font-medium">
                    Card is currently inactive
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="ghost" size="sm" className="text-uphold-primary">
                  View details
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="border-dashed border-2 border-gray-300 bg-gray-50 flex flex-col items-center justify-center p-6 shadow-none">
            <Plus className="h-10 w-10 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium mb-1">Add New Card</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Add a virtual or physical card to your account
            </p>
            <Button className="bg-uphold-primary">
              <Plus className="h-4 w-4 mr-1" />
              Add Card
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
