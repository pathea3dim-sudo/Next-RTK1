import Image from "next/image";
import { ProductsTable } from "./features/products/ProductsTable";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
    {/* header  */}
    <Navbar/>

    <ProductsTable/>

    {/* footer  */}
    <Footer/>

    </>
  );
}
