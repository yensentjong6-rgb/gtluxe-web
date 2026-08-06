import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5" />

        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}