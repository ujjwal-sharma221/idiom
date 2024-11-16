import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LoaderCircle className="size-6 text-muted-foreground animate-spin" />
    </div>
  );
}
