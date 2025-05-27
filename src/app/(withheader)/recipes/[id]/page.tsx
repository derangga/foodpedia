export default async function DetailRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="container pt-16 mx-auto">
      <div>{id}</div>
    </div>
  );
}
