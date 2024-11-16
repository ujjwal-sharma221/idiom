export function StickyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden lg:block sticky self-end bottom-6">
      <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
}
