import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserLayout({ children }:any) {
  return (
    <div className="flex flex-col min-h-screen">
      
      {children}
      
    </div>
  );
}