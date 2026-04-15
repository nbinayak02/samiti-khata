type PageHeaderProps = {
  title: string
  description: string
  align?: "LEFT" | "RIGHT" | "CENTER"
}

export const PageHeader = ({ title, description, align }: PageHeaderProps) => {
  return (
    <div
      className={
        align === "CENTER"
          ? "flex w-full flex-col items-center justify-center"
          : ""
      }
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
