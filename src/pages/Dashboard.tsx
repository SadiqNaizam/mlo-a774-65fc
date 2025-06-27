import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';

// Custom Layout Components
import Header from '../components/layout/Header';
import LeftSidebar from '../components/layout/LeftSidebar';
import Footer from '../components/layout/Footer';

// Custom UI Components
import StatsCard from '../components/StatsCard';
import SalesChart from '../components/SalesChart';
import RecentActivityFeed from '../components/RecentActivityFeed';

// shadcn/ui Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for the recent orders table
const recentOrders = [
  {
    orderId: 'ORD-2024-1235',
    customer: 'Liam Johnson',
    email: 'liam@example.com',
    amount: '$250.00',
    status: 'Fulfilled',
  },
  {
    orderId: 'ORD-2024-1234',
    customer: 'Olivia Smith',
    email: 'olivia@example.com',
    amount: '$150.00',
    status: 'Pending',
  },
  {
    orderId: 'ORD-2024-1233',
    customer: 'Noah Williams',
    email: 'noah@example.com',
    amount: '$350.00',
    status: 'Fulfilled',
  },
  {
    orderId: 'ORD-2024-1232',
    customer: 'Emma Brown',
    email: 'emma@example.com',
    amount: '$450.00',
    status: 'Canceled',
  },
];

const Dashboard = () => {
  console.log('Dashboard page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(prev => !prev)} 
      />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* Stats Cards Section */}
          <section className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <StatsCard
              title="Total Revenue"
              value="$45,231.89"
              percentageChange={20.1}
              description="from last month"
              metricIcon={<DollarSign className="h-4 w-4" />}
            />
            <StatsCard
              title="New Orders"
              value="+1,234"
              percentageChange={15.2}
              description="from last month"
              metricIcon={<ShoppingCart className="h-4 w-4" />}
            />
            <StatsCard
              title="New Customers"
              value="+573"
              percentageChange={12.5}
              description="this month"
              metricIcon={<Users className="h-4 w-4" />}
            />
            <StatsCard
              title="Active Now"
              value="89"
              percentageChange={-5.2}
              description="since last hour"
              metricIcon={<Activity className="h-4 w-4" />}
            />
          </section>

          {/* Main Content Grid */}
          <section className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <div className="xl:col-span-1">
              <RecentActivityFeed />
            </div>
          </section>

          {/* Recent Orders Table */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  An overview of your most recent orders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Order ID
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell>
                          <div className="font-medium">{order.customer}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {order.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Link to="/orders" className="hover:underline">
                            {order.orderId}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'Fulfilled'
                                ? 'default'
                                : order.status === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {order.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;