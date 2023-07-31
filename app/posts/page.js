import Link from "next/link";

async function fetchPosts() {
  const url = "https://raw.githubusercontent.com/Bailsnob/friendliness/main/man.json";
  // const response = await fetch(url, {next: {revalidate: 5}});
  const response = await fetch(url, {cache: "no-store"});
  const data = await response.json();
  return data.posts; 
}

export default async function AllPostsPage() {
  const lastRenderedTime = new Date().toLocaleTimeString();
  const posts = await fetchPosts();

  return (
    <>
      <h1>all posts</h1>
      <p>last rendered time: {lastRenderedTime}</p>
      <ul>
        {posts && posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${posts.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// "use client";
// import { useEffect, useState } from "react";

// export default function AllPostsPage() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     fetch("/posts.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setPosts(data.posts);
//         setIsLoading(false);
//       });
//   }, []); //for flags

//   if (isLoading) {
//     return <p>loading...</p>;
//   }

//   return (
//     <>
//       <h1>all posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </>
//   );
// }
