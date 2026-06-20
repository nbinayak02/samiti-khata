export default function ErrorField({
  message,
}: {
  message: string | undefined;
}) {
  return <p className="text-red-700">{message || "Some error occured."}</p>;
}
