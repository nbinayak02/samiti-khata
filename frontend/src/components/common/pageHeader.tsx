export const PageHeader = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
