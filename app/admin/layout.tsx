
import type { Metadata } from "next";
import { Geist, Geist_Mono,Roboto,Poppins } from "next/font/google";
import '../globals.css';
import AdminWrapper from "../components/AdminWrapper";




const roboto=Roboto({
  subsets:['latin'],
  display:"swap"
})





export default function AdminLayout({
  children,
}: any) {
  
  return (
    <html
      lang="en"
      className={`${roboto.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AdminWrapper>
          {children}
        </AdminWrapper>
        
          
          
        
        
        
        </body>
    </html>
  );
}
