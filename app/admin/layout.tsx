
import type { Metadata } from "next";
import { Roboto, } from "next/font/google";

import AdminWrapper from "../components/AdminWrapper";

export default function AdminLayout({ children }: any) {
  return (
    <AdminWrapper>
     
      {children}
     
    </AdminWrapper>
  );
}
