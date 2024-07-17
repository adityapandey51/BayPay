export function Card({
 title,
 children
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
   <div className="border p-4 rounded-lg border-2 border-gray-400">
    <h1 className="text-xl font-bold pb-2">{title}</h1>  
      {children}
   </div>
  );
}
