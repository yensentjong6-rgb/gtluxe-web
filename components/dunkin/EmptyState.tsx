import { Package } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white py-16">
      <Package className="mb-4 h-12 w-12 text-gray-300" />

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
}