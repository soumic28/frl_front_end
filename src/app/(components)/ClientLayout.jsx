"use client"
import { AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';

const ClientLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className=" w-full">
        {children}
      </div>
    </AnimatePresence>
  );
};

export default ClientLayout; 