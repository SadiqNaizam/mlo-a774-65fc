import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Warehouse, UserPlus, ArrowRight } from "lucide-react";

// Mock data for recent activities
const activities = [
  {
    type: "order",
    text: "New order #ORD-2024-1235 from John D.",
    time: "5m ago",
    link: "/orders"
  },
  {
    type: "stock",
    text: "Product \"Classic Tee\" is low on stock.",
    time: "1h ago",
    link: "/products"
  },
  {
    type: "customer",
    text: "New customer signed up: Jane S.",
    time: "3h ago",
    link: "/customers"
  },
  {
    type: "order",
    text: "Order #ORD-2024-1234 has been shipped.",
    time: "1d ago",
    link: "/orders"
  },
];

// Helper to get the right icon based on activity type
const getActivityIcon = (type: string) => {
  switch (type) {
    case "order":
      return <ShoppingCart className="h-4 w-4" />;
    case "stock":
      return <Warehouse className="h-4 w-4" />;
    case "customer":
      return <UserPlus className="h-4 w-4" />;
    default:
      return null;
  }
};

const RecentActivityFeed: React.FC = () => {
  console.log('RecentActivityFeed loaded');

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarFallback className="bg-muted text-muted-foreground">
                {getActivityIcon(activity.type)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1 flex-grow">
              <p className="text-sm font-medium leading-none">
                <Link to={activity.link} className="hover:underline">
                  {activity.text}
                </Link>
              </p>
            </div>
            <div className="ml-auto text-sm text-muted-foreground flex-shrink-0">
              {activity.time}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild size="sm" variant="outline" className="w-full">
          <Link to="/orders">
            View All Orders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentActivityFeed;