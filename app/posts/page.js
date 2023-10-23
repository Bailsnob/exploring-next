import Link from "next/link";
import path from "path";
import { readFileSync } from "fs";

export const revalidate = 30;

function fetchPosts() {
  const filePath = path.join(process.cwd(), "app", "db", "posts.json");
  const jsonData = readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data; 
}

export default function AllPostsPage() {
  const lastRenderedTime = new Date().toLocaleTimeString();
  const posts = fetchPosts();
  // console.log(posts);

  return (
    <>
      <h1>all posts</h1>
      <p>last rendered time: {lastRenderedTime}</p>
      <ul>
        {posts && posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
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
