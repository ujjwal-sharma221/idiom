const LessonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col size-full">{children}</div>
    </div>
  );
};
export default LessonLayout;
