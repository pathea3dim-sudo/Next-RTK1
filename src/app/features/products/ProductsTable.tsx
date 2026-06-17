// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"


// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../../../components/ui/pagination"


// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"




// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ]

// export function ProductsTablez() {
//   return (
//     <Table>
//       <TableCaption>A list of your recent invoices.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[100px]">Invoice</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Method</TableHead>
//           <TableHead className="text-right">Amount</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {invoices.map((invoice) => (
//           <TableRow key={invoice.invoice}>
//             <TableCell className="font-medium">{invoice.invoice}</TableCell>
//             <TableCell>{invoice.paymentStatus}</TableCell>
//             <TableCell>{invoice.paymentMethod}</TableCell>
//             <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={3}>Total</TableCell>
//           <TableCell className="text-right">$2,500.00</TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   )
// }



'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const invoices = [
  { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: 250, paymentMethod: 'Credit Card' },
  { invoice: 'INV002', paymentStatus: 'Pending', totalAmount: 150, paymentMethod: 'PayPal' },
  { invoice: 'INV003', paymentStatus: 'Unpaid', totalAmount: 350, paymentMethod: 'Bank Transfer' },
  { invoice: 'INV004', paymentStatus: 'Paid', totalAmount: 450, paymentMethod: 'Credit Card' },
  { invoice: 'INV005', paymentStatus: 'Paid', totalAmount: 550, paymentMethod: 'PayPal' },
  { invoice: 'INV006', paymentStatus: 'Pending', totalAmount: 200, paymentMethod: 'Bank Transfer' },
  { invoice: 'INV007', paymentStatus: 'Unpaid', totalAmount: 300, paymentMethod: 'Credit Card' },
  // Add more to test pagination
];

type SortOption = 'status-asc' | 'status-desc' | 'amount-asc' | 'amount-desc';

export function ProductsTable() {
  const [page, setPage] = useState(1);
  const size = 3; // items per page
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('status-asc');

  // --- Client‑side filtering (search across all fields) ---
  const filtered = useMemo(() => {
    if (!search.trim()) return invoices;
    const q = search.toLowerCase().trim();
    return invoices.filter((inv) =>
      Object.values(inv).some((val) =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [search]);

  // --- Client‑side sorting ---
  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortBy) {
      case 'status-asc':
        return copy.sort((a, b) => a.paymentStatus.localeCompare(b.paymentStatus));
      case 'status-desc':
        return copy.sort((a, b) => b.paymentStatus.localeCompare(a.paymentStatus));
      case 'amount-asc':
        return copy.sort((a, b) => a.totalAmount - b.totalAmount);
      case 'amount-desc':
        return copy.sort((a, b) => b.totalAmount - a.totalAmount);
      default:
        return copy;
    }
  }, [filtered, sortBy]);

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / size);
  const safePage = Math.min(page, totalPages || 1);
  const start = (safePage - 1) * size;
  const paginated = sorted.slice(start, start + size);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const totalAmountSum = paginated.reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-64"
          />
          <Select
            value={sortBy}
            onValueChange={(val: SortOption) => {
              setSortBy(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status-asc">Status ↑</SelectItem>
              <SelectItem value="status-desc">Status ↓</SelectItem>
              <SelectItem value="amount-asc">Amount ↑</SelectItem>
              <SelectItem value="amount-desc">Amount ↓</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No invoices found
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((inv) => (
                <TableRow key={inv.invoice}>
                  <TableCell className="font-medium">{inv.invoice}</TableCell>
                  <TableCell>{inv.paymentStatus}</TableCell>
                  <TableCell>{inv.paymentMethod}</TableCell>
                  <TableCell className="text-right">${inv.totalAmount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Subtotal (current page)</TableCell>
              <TableCell className="text-right">${totalAmountSum.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {start + 1}–{Math.min(start + size, totalItems)} of {totalItems}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(safePage - 1)}
                  className={safePage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) pageNum = i + 1;
                else if (safePage <= 4) pageNum = i + 1;
                else if (safePage >= totalPages - 3) pageNum = totalPages - 6 + i;
                else pageNum = safePage - 3 + i;

                if (i === 3 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) {
                  return (
                    <PaginationItem key="ellipsis1">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                if (i === 4 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) return null;
                if (i === 5 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) {
                  return (
                    <PaginationItem key="ellipsis2">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === safePage}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(safePage + 1)}
                  className={safePage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}