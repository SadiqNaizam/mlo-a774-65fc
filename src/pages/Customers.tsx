import React, { useState, useMemo } from 'react';

import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the type for a customer
type Customer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallback: string;
  orderCount: number;
  totalSpent: number;
};

// Placeholder customer data
const customersData: Customer[] = [
  { id: 'c1', name: 'Olivia Martin', email: 'olivia.martin@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', avatarFallback: 'OM', orderCount: 5, totalSpent: 499.95 },
  { id: 'c2', name: 'Jackson Lee', email: 'jackson.lee@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', avatarFallback: 'JL', orderCount: 12, totalSpent: 1250.70 },
  { id: 'c3', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', avatarFallback: 'IN', orderCount: 2, totalSpent: 150.00 },
  { id: 'c4', name: 'William Kim', email: 'will@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', avatarFallback: 'WK', orderCount: 8, totalSpent: 890.50 },
  { id: 'c5', name: 'Sophia Davis', email: 'sophia.davis@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026708d', avatarFallback: 'SD', orderCount: 22, totalSpent: 2345.00 },
  { id: 'c6', name: 'Liam Garcia', email: 'liam.garcia@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026709d', avatarFallback: 'LG', orderCount: 1, totalSpent: 75.25 },
  { id: 'c7', name: 'Ava Rodriguez', email: 'ava.rodriguez@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e2902670ad', avatarFallback: 'AR', orderCount: 15, totalSpent: 1500.00 },
  { id: 'c8', name: 'Noah Martinez', email: 'noah.martinez@email.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e2902670bd', avatarFallback: 'NM', orderCount: 3, totalSpent: 320.80 },
];

const ITEMS_PER_PAGE = 5;

const Customers = () => {
  console.log('Customers page loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredCustomers = useMemo(() => {
    return customersData.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCustomers.slice(startIndex, endIndex);
  }, [filteredCustomers, currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(prev => !prev)} 
      />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                Manage your customers and view their sales history.
              </CardDescription>
              <div className="pt-2">
                <Input 
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.length > 0 ? (
                    paginatedCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                              <AvatarFallback>{customer.avatarFallback}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{customer.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell className="text-center">{customer.orderCount}</TableCell>
                        <TableCell className="text-right">
                          ${customer.totalSpent.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{paginatedCustomers.length}</strong> of <strong>{filteredCustomers.length}</strong> customers
              </div>
              <div className="ml-auto">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Customers;