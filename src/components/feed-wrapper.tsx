export function FeedWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 w-screen ml-6 relative top-0 pb-10">{children}</div>
  );
}
