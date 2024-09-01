interface Params {
  id: string
}

export default function Homepage({params} : {params: Params}) {
  const {id} = params
  return (
    <div>
      <h1>Post ID: {id}</h1>
    </div>
  );
}
