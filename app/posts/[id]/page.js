export default function PostDetailPage({ params }) {
  console.log(params);

  const { id } = params;
  return <h1>detail page-post {id}</h1>;
}
