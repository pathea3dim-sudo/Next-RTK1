
// // 'use client';

// // import { useState, useMemo } from 'react';
// // import { useGetProductsQuery } from './api';
// // import { Product } from '../../types/product';
// // import {
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableHead,
// //     TableHeader,
// //     TableRow,
// // } from '@/components/ui/table';
// // import {
// //     Pagination,
// //     PaginationContent,
// //     PaginationEllipsis,
// //     PaginationItem,
// //     PaginationLink,
// //     PaginationNext,
// //     PaginationPrevious,
// // } from '@/components/ui/pagination';
// // import {
// //     Dialog,
// //     DialogContent,
// //     DialogHeader,
// //     DialogTitle,
// // } from '@/components/ui/dialog';
// // import { Input } from '@/components/ui/input';
// // import {
// //     Select,
// //     SelectContent,
// //     SelectItem,
// //     SelectTrigger,
// //     SelectValue,
// // } from '@/components/ui/select';
// // import Image from 'next/image';

// // type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

// // export default function ProductsTable() {
// //     const { data: products = [], isLoading, error } = useGetProductsQuery();
// //     const [page, setPage] = useState(1);
// //     const size = 5;
// //     const [search, setSearch] = useState('');
// //     const [sortBy, setSortBy] = useState<SortOption>('name-asc');

// //     // Filter across all fields
// //     const filtered = useMemo(() => {
// //         if (!search.trim()) return products;
// //         const q = search.toLowerCase().trim();
// //         return products.filter((p) =>
// //             Object.values(p).some((val) =>
// //                 String(val).toLowerCase().includes(q)
// //             )
// //         );
// //     }, [products, search]);

// //     // Sort
// //     const sorted = useMemo(() => {
// //         const copy = [...filtered];
// //         switch (sortBy) {
// //             case 'name-asc':
// //                 return copy.sort((a, b) => a.title.localeCompare(b.title));
// //             case 'name-desc':
// //                 return copy.sort((a, b) => b.title.localeCompare(a.title));
// //             case 'price-asc':
// //                 return copy.sort((a, b) => a.price - b.price);
// //             case 'price-desc':
// //                 return copy.sort((a, b) => b.price - a.price);
// //             default:
// //                 return copy;
// //         }
// //     }, [filtered, sortBy]);

// //     // Paginate
// //     const totalItems = sorted.length;
// //     const totalPages = Math.ceil(totalItems / size);
// //     const safePage = Math.min(page, totalPages || 1);
// //     const start = (safePage - 1) * size;
// //     const paginated = sorted.slice(start, start + size);

// //     const handlePageChange = (newPage: number) => {
// //         if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
// //     };

// //     // Modal
// //     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// //     const [isModalOpen, setIsModalOpen] = useState(false);

// //     const handleRowClick = (product: Product) => {
// //         setSelectedProduct(product);
// //         setIsModalOpen(true);
// //     };

// //     if (isLoading) {
// //         return <div className="p-8 text-center">Loading products...</div>;
// //     }
// //     if (error) {
// //         return <div className="p-8 text-center text-red-500">Failed to load products.</div>;
// //     }

// //     return (
// //         <div className="container mx-auto p-6 max-w-6xl">
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
// //                 <h1 className="text-2xl font-bold">Products</h1>
// //                 <div className="flex flex-wrap gap-3 w-full sm:w-auto">
// //                     {/* <Input
// //             placeholder="Search all fields..."
// //             value={search}
// //             onChange={(e) => {
// //               setSearch(e.target.value);
// //               setPage(1);
// //             }}
// //             className="w-full sm:w-64"
// //           /> */}

// //                     <Input
// //                         placeholder="Search all fields..."
// //                         value={search}
// //                         onChange={(e) => {
// //                             setSearch(e.target.value);
// //                             setPage(1);          // reset to first page
// //                         }}
// //                         className="w-full sm:w-64"
// //                     />
// //                     <Select
// //                         value={sortBy}
// //                         onValueChange={(val: SortOption) => {
// //                             setSortBy(val);
// //                             setPage(1);
// //                         }}
// //                     >
// //                         <SelectTrigger className="w-[180px]">
// //                             <SelectValue placeholder="Sort by" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                             <SelectItem value="name-asc">Name ↑</SelectItem>
// //                             <SelectItem value="name-desc">Name ↓</SelectItem>
// //                             <SelectItem value="price-asc">Price ↑</SelectItem>
// //                             <SelectItem value="price-desc">Price ↓</SelectItem>
// //                         </SelectContent>
// //                     </Select>
// //                 </div>
// //             </div>

// //             {/* Table */}
// //             <div className="border rounded-lg shadow-sm">
// //                 <Table>
// //                     <TableHeader>
// //                         <TableRow>
// //                             <TableHead className="w-16">#</TableHead>
// //                             <TableHead className="w-16">Image</TableHead>
// //                             <TableHead>Name</TableHead>
// //                             <TableHead className="w-32">Category</TableHead>
// //                             <TableHead className="w-28">Price</TableHead>
// //                         </TableRow>
// //                     </TableHeader>
// //                     <TableBody>
// //                         {paginated.length === 0 ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
// //                                     No products found
// //                                 </TableCell>
// //                             </TableRow>
// //                         ) : (
// //                             paginated.map((product, idx) => (
// //                                 <TableRow
// //                                     key={product.id}
// //                                     className="cursor-pointer hover:bg-muted/50"
// //                                     onClick={() => handleRowClick(product)}
// //                                 >
// //                                     <TableCell>{start + idx + 1}</TableCell>
// //                                     <TableCell>
// //                                         <Image
// //                                             src={product.image}
// //                                             alt={product.title}
// //                                             width={48}
// //                                             height={48}
// //                                             className="object-contain rounded-md bg-muted p-1"
// //                                         />
// //                                     </TableCell>
// //                                     <TableCell className="font-medium truncate max-w-xs">
// //                                         {product.title}
// //                                     </TableCell>
// //                                     <TableCell>
// //                                         <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">
// //                                             {product.category}
// //                                         </span>
// //                                     </TableCell>
// //                                     <TableCell className="font-semibold text-blue-600">
// //                                         ${product.price.toFixed(2)}
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ))
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </div>

// //             {/* Pagination */}
// //             {totalItems > 0 && (
// //                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
// //                     <div className="text-sm text-muted-foreground">
// //                         Showing {start + 1}–{Math.min(start + size, totalItems)} of {totalItems}
// //                     </div>
// //                     <Pagination>
// //                         <PaginationContent>
// //                             <PaginationItem>
// //                                 <PaginationPrevious
// //                                     onClick={() => handlePageChange(safePage - 1)}
// //                                     className={safePage === 1 ? 'pointer-events-none opacity-50' : ''}
// //                                 />
// //                             </PaginationItem>
// //                             {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
// //                                 let pageNum;
// //                                 if (totalPages <= 7) pageNum = i + 1;
// //                                 else if (safePage <= 4) pageNum = i + 1;
// //                                 else if (safePage >= totalPages - 3) pageNum = totalPages - 6 + i;
// //                                 else pageNum = safePage - 3 + i;

// //                                 if (i === 3 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) {
// //                                     return (
// //                                         <PaginationItem key="ellipsis1">
// //                                             <PaginationEllipsis />
// //                                         </PaginationItem>
// //                                     );
// //                                 }
// //                                 if (i === 4 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) return null;
// //                                 if (i === 5 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) {
// //                                     return (
// //                                         <PaginationItem key="ellipsis2">
// //                                             <PaginationEllipsis />
// //                                         </PaginationItem>
// //                                     );
// //                                 }
// //                                 return (
// //                                     <PaginationItem key={pageNum}>
// //                                         <PaginationLink
// //                                             isActive={pageNum === safePage}
// //                                             onClick={() => handlePageChange(pageNum)}
// //                                         >
// //                                             {pageNum}
// //                                         </PaginationLink>
// //                                     </PaginationItem>
// //                                 );
// //                             })}
// //                             <PaginationItem>
// //                                 <PaginationNext
// //                                     onClick={() => handlePageChange(safePage + 1)}
// //                                     className={safePage === totalPages ? 'pointer-events-none opacity-50' : ''}
// //                                 />
// //                             </PaginationItem>
// //                         </PaginationContent>
// //                     </Pagination>
// //                 </div>
// //             )}

// //             {/* Modal */}
// //             <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
// //                 <DialogContent className="max-w-md">
// //                     <DialogHeader>
// //                         <DialogTitle>Product Details</DialogTitle>
// //                     </DialogHeader>
// //                     {selectedProduct && (
// //                         <div className="space-y-4">
// //                             <div className="flex justify-center">
// //                                 <Image
// //                                     src={selectedProduct.image}
// //                                     alt={selectedProduct.title}
// //                                     width={200}
// //                                     height={200}
// //                                     className="object-contain h-48 w-auto"
// //                                 />
// //                             </div>
// //                             <div>
// //                                 <h3 className="font-semibold text-lg">{selectedProduct.title}</h3>
// //                                 <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
// //                             </div>
// //                             <div className="grid grid-cols-2 gap-2 text-sm">
// //                                 <div>
// //                                     <span className="font-medium">Category</span>
// //                                     <p className="capitalize">{selectedProduct.category}</p>
// //                                 </div>
// //                                 <div>
// //                                     <span className="font-medium">Price</span>
// //                                     <p className="text-blue-600 font-bold">${selectedProduct.price.toFixed(2)}</p>
// //                                 </div>
// //                                 <div className="col-span-2">
// //                                     <span className="font-medium">Slug</span>
// //                                     <p className="text-xs text-muted-foreground font-mono truncate">
// //                                         {selectedProduct.slug}
// //                                     </p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </DialogContent>
// //             </Dialog>
// //         </div>
// //     );
// // }



// 'use client';

// import { useState, useMemo } from 'react';
// import { useGetProductsQuery } from './api';
// import { Product } from '@/types/product';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import Image from 'next/image';

// type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

// export default function ProductsTable() {
//   const { data: products = [], isLoading, error } = useGetProductsQuery();
//   const [page, setPage] = useState(1);
//   const size = 5;
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState<SortOption>('name-asc');

//   const filtered = useMemo(() => {
//     if (!search.trim()) return products;
//     const q = search.toLowerCase().trim();
//     return products.filter((p) =>
//       Object.values(p).some((val) =>
//         String(val).toLowerCase().includes(q)
//       )
//     );
//   }, [products, search]);

//   const sorted = useMemo(() => {
//     const copy = [...filtered];
//     switch (sortBy) {
//       case 'name-asc':
//         return copy.sort((a, b) => a.title.localeCompare(b.title));
//       case 'name-desc':
//         return copy.sort((a, b) => b.title.localeCompare(a.title));
//       case 'price-asc':
//         return copy.sort((a, b) => a.price - b.price);
//       case 'price-desc':
//         return copy.sort((a, b) => b.price - a.price);
//       default:
//         return copy;
//     }
//   }, [filtered, sortBy]);

//   const totalItems = sorted.length;
//   const totalPages = Math.ceil(totalItems / size);
//   const safePage = Math.min(page, totalPages || 1);
//   const start = (safePage - 1) * size;
//   const paginated = sorted.slice(start, start + size);

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
//   };

//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleRowClick = (product: Product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   if (isLoading) {
//     return <div className="p-8 text-center">កំពុងផ្ទុក...</div>;
//   }
//   if (error) {
//     return <div className="p-8 text-center text-red-500">បរាជ័យក្នុងការទាញយកទិន្នន័យ។</div>;
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-6xl">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h1 className="text-2xl font-bold">ផលិតផល</h1>
//         <div className="flex flex-wrap gap-3 w-full sm:w-auto">
//           <Input
//             placeholder="ស្វែងរកគ្រប់វាល..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="w-full sm:w-64"
//           />
//           <Select
//             value={sortBy}
//             onValueChange={(val: SortOption) => {
//               setSortBy(val);
//               setPage(1);
//             }}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="តម្រៀបតាម" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="name-asc">ឈ្មោះ ↑</SelectItem>
//               <SelectItem value="name-desc">ឈ្មោះ ↓</SelectItem>
//               <SelectItem value="price-asc">តម្លៃ ↑</SelectItem>
//               <SelectItem value="price-desc">តម្លៃ ↓</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <div className="border rounded-lg shadow-sm">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-16">#</TableHead>
//               <TableHead className="w-16">រូបភាព</TableHead>
//               <TableHead>ឈ្មោះ</TableHead>
//               <TableHead className="w-32">ប្រភេទ</TableHead>
//               <TableHead className="w-28">តម្លៃ</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginated.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
//                   រកមិនឃើញផលិតផល
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginated.map((product, idx) => (
//                 <TableRow
//                   key={product.id}
//                   className="cursor-pointer hover:bg-muted/50"
//                   onClick={() => handleRowClick(product)}
//                 >
//                   <TableCell>{start + idx + 1}</TableCell>
//                   <TableCell>
//                     <Image
//                       src={product.image}
//                       alt={product.title}
//                       width={48}
//                       height={48}
//                       className="object-contain rounded-md bg-muted p-1"
//                     />
//                   </TableCell>
//                   <TableCell className="font-medium truncate max-w-xs">
//                     {product.title}
//                   </TableCell>
//                   <TableCell>
//                     <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">
//                       {product.category}
//                     </span>
//                   </TableCell>
//                   <TableCell className="font-semibold text-blue-600">
//                     ${product.price.toFixed(2)}
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {totalItems > 0 && (
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
//           <div className="text-sm text-muted-foreground">
//             បង្ហាញ {start + 1}–{Math.min(start + size, totalItems)} នៃ {totalItems}
//           </div>
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   onClick={() => handlePageChange(safePage - 1)}
//                   className={safePage === 1 ? 'pointer-events-none opacity-50' : ''}
//                 />
//               </PaginationItem>
//               {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 7) pageNum = i + 1;
//                 else if (safePage <= 4) pageNum = i + 1;
//                 else if (safePage >= totalPages - 3) pageNum = totalPages - 6 + i;
//                 else pageNum = safePage - 3 + i;

//                 if (i === 3 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) {
//                   return (
//                     <PaginationItem key="ellipsis1">
//                       <PaginationEllipsis />
//                     </PaginationItem>
//                   );
//                 }
//                 if (i === 4 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) return null;
//                 if (i === 5 && totalPages > 7 && safePage > 4 && safePage < totalPages - 3) {
//                   return (
//                     <PaginationItem key="ellipsis2">
//                       <PaginationEllipsis />
//                     </PaginationItem>
//                   );
//                 }
//                 return (
//                   <PaginationItem key={pageNum}>
//                     <PaginationLink
//                       isActive={pageNum === safePage}
//                       onClick={() => handlePageChange(pageNum)}
//                     >
//                       {pageNum}
//                     </PaginationLink>
//                   </PaginationItem>
//                 );
//               })}
//               <PaginationItem>
//                 <PaginationNext
//                   onClick={() => handlePageChange(safePage + 1)}
//                   className={safePage === totalPages ? 'pointer-events-none opacity-50' : ''}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}

//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>ព័ត៌មានលម្អិត</DialogTitle>
//           </DialogHeader>
//           {selectedProduct && (
//             <div className="space-y-4">
//               <div className="flex justify-center">
//                 <Image
//                   src={selectedProduct.image}
//                   alt={selectedProduct.title}
//                   width={200}
//                   height={200}
//                   className="object-contain h-48 w-auto"
//                 />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">{selectedProduct.title}</h3>
//                 <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-2 text-sm">
//                 <div>
//                   <span className="font-medium">ប្រភេទ</span>
//                   <p className="capitalize">{selectedProduct.category}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">តម្លៃ</span>
//                   <p className="text-blue-600 font-bold">${selectedProduct.price.toFixed(2)}</p>
//                 </div>
//                 <div className="col-span-2">
//                   <span className="font-medium">Slug</span>
//                   <p className="text-xs text-muted-foreground font-mono truncate">
//                     {selectedProduct.slug}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


'use client';

import { useState, useMemo } from 'react';
import { useGetProductsQuery } from './api';
import { Product } from '@/types/product';
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export default function ProductsTable() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [page, setPage] = useState(1);
  const size = 5;
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  // Search across all fields
  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase().trim();
    return products.filter((p) =>
      Object.values(p).some((val) =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [products, search]);


  const sorted = useMemo(() => {
  const copy = [...filtered];              
  switch (sortBy) {
    case 'name-asc':  return copy.sort((a,b) => a.title.localeCompare(b.title));
    case 'name-desc': return copy.sort((a,b) => b.title.localeCompare(a.title));
    case 'price-asc': return copy.sort((a,b) => a.price - b.price);
    case 'price-desc': return copy.sort((a,b) => b.price - a.price);
    default: return copy;
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

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Failed to load products.</div>;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search all fields..."
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
              <SelectItem value="name-asc">Name ↑</SelectItem>
              <SelectItem value="name-desc">Name ↓</SelectItem>
              <SelectItem value="price-asc">Price ↑</SelectItem>
              <SelectItem value="price-desc">Price ↓</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-32">Category</TableHead>
              <TableHead className="w-28">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((product, idx) => (
                <TableRow
                  key={product.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(product)}
                >
                  <TableCell>{start + idx + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="object-contain rounded-md bg-muted p-1"
                    />
                  </TableCell>
                  <TableCell className="font-medium truncate max-w-xs">
                    {product.title}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-blue-600">
                    ${product.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  width={200}
                  height={200}
                  className="object-contain h-48 w-auto"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{selectedProduct.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Category</span>
                  <p className="capitalize">{selectedProduct.category}</p>
                </div>
                <div>
                  <span className="font-medium">Price</span>
                  <p className="text-blue-600 font-bold">${selectedProduct.price.toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Slug</span>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {selectedProduct.slug}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}