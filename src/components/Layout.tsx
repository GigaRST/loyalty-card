import React, { ReactNode } from "react";
import Footer from "../components/Footer.tsx";
import Navbar from "../components/Navbar.tsx";
import { useUserStore } from "../store/useUserStore.ts";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col h-screen">
      {user && <Navbar />}
      <div className="flex-1 mb-2 overflow-y-auto">{children}</div>
      {user && <Footer />}
    </div>
  );
};

export default Layout;
