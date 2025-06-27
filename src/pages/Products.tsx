import React from 'react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';

// Custom Layout Components
import Header from '../components/layout/Header';
import LeftSidebar from '../components/layout/LeftSidebar';
import Footer from '../components/layout/Footer';

// shadcn/ui Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';


// Placeholder Product Data
const products = [
  {
    id: 'prod_001',
    name: 'GamerPro Headset',
    sku: 'GP-H2024',
    stock: 75,
    price: 79.99,
    status: 'In Stock',
    image: 'https://placehold.co/64x64/000000/FFFFFF/png?text=GP',
  },
  {
    id: 'prod_002',
    name: 'ErgoMechanical Keyboard',
    sku: 'EMK-X1',
    stock: 30,
    price: 129.99,
    status: 'In Stock',
    image: 'https://placehold.co/64x64/3B82F6/FFFFFF/png?text=EMK',
  },
  {
    id: 'prod_003',
    name: '4K UltraWide Monitor',
    sku: 'UWM-4K-2023',
    stock: 8,
    price: 499.99,
    status: 'Low Stock',
    image: 'https://placehold.co/64x64/10B981/FFFFFF/png?text=4K',
  },
  {
    id: 'prod_004',
    name: 'Wireless Charging Pad',
    sku: 'WCP-15W',
    stock: 150,
    price: 25.50,
    status: 'In Stock',
    image: 'https://placehold.co/64x64/F59E0B/FFFFFF/png?text=WCP',
  },
  {
    id: 'prod_005',
    name: 'Silent Optical Mouse',
    sku: 'SOM-B2',
    stock: 0,
    price: 35.00,
    status: 'Out of Stock',
    image: 'https://placehold.co/64x64/9CA3AF/FFFFFF/png?text=SOM',
  },
];

const Products = () => {
  console.log('Products page loaded');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={() => setIsCollapsed(prev => !prev)} 
      />
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
          </div>
          
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Product Catalog</CardTitle>
                <CardDescription>
                  View, add, and manage your products.
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Fill in the details for your new product. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    {/* Simplified Form */}
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" placeholder="GamerPro Headset" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sku" className="text-right">SKU</Label>
                        <Input id="sku" placeholder="GP-H2024" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price</Label>
                        <Input id="price" type="number" placeholder="79.99" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">Stock</Label>
                        <Input id="stock" type="number" placeholder="75" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button type="submit" onClick={() => setIsDialogOpen(false)}>Save Product</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">Stock</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.image}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'Out of Stock' ? 'destructive' : product.status === 'Low Stock' ? 'secondary' : 'default'}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}\
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{products.length}</strong> of <strong>{products.length}</strong> products
              </div>
              <Pagination className="ml-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Products;