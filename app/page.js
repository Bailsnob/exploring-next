import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <p>hello</p>
      <Link href="/posts">posts</Link>
    </div>
  );
}
