import Sidebar from "@/components/dunkin/Sidebar";
import Header from "@/components/dunkin/Header";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="p-8">
          {children}

        <Toaster richColors />  
        </main>
      </div>
    </div>
  );
}