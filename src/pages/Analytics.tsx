import React, { useState } from 'react';
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";

// Custom Components
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Footer from "@/components/layout/Footer";
import SalesChart from "@/components/SalesChart";

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Placeholder data for tables
const productsData = [
  { id: 'prod1', name: 'Vintage T-Shirt', sales: 150, revenue: 4500 },
  { id: 'prod2', name: 'Classic Hoodie', sales: 120, revenue: 7200 },
  { id: 'prod3', name: 'Designer Jeans', sales: 80, revenue: 8000 },
  { id: 'prod4', name: 'Snapback Cap', sales: 200, revenue: 5000 },
];

const customersData = [
  { id: 'cust1', name: 'John Doe', orders: 12, totalSpent: 2300 },
  { id: 'cust2', name: 'Jane Smith', orders: 8, totalSpent: 1850 },
  { id: 'cust3', name: 'Michael Johnson', orders: 15, totalSpent: 3100 },
  { id: 'cust4', name: 'Emily Davis', orders: 5, totalSpent: 950 },
];

const Analytics = () => {
  console.log('Analytics page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    to: new Date(),
  });

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(prev => !prev)} 
      />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center justify-between my-6">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales_by_product">Sales by Product</TabsTrigger>
              <TabsTrigger value="top_customers">Top Customers</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
                <SalesChart />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.5%</div>
                            <p className="text-xs text-muted-foreground">+0.2% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$125.50</div>
                            <p className="text-xs text-muted-foreground">+$5.00 from last month</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="sales_by_product" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Product</CardTitle>
                  <CardDescription>
                    A breakdown of sales performance for individual products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="text-right">Units Sold</TableHead>
                        <TableHead className="text-right">Total Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productsData.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="text-right">{product.sales}</TableCell>
                          <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}\
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="top_customers" className="pt-4">
                 <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>
                    Your most valuable customers based on total spending.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead className="text-right">Total Orders</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customersData.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell className="text-right">{customer.orders}</TableCell>
                          <TableCell className="text-right">${customer.totalSpent.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}\
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;