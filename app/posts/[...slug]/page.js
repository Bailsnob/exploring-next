export default function AnotherPostExample({ params }) {
  console.log(params);
  const { slug } = params;
  const slugStrings = slug?.join("/");
  return <h1>posting {slugStrings}</h1>;
}
