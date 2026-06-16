export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
