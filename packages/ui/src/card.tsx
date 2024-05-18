export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-6 bg-white rounded-xl bg-[#ededed] max-h-96 overflow-auto">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <p>{children}</p>
    </div>
  );
}
