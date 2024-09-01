interface Params {
  id: string
};
export default function Post({ params }: {params: Params}) {
  const {id}  = params;

  return (
    <div>
      <h1>Edit ID: {id}</h1>
    </div>
  );
}