"use client";

import styles from "./navigation.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";

export default function Navigation() {
  const { signOut } = useAuth();
  const router = useRouter();
  const signOutHandler = () => {
    signOut();
    router.push("/");
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles["nav-link"]}>
        HOME
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts" className={styles["nav-link"]}>
              Posts
            </Link>
          </li>
          <li>
            <Link href="/admin/create-post" className={styles["nav-link"]}>
              Create Post
            </Link>
          </li>
          <li>
            <span className={styles["nav-link"]} onClick={signOutHandler}>Sign Out</span>
          </li>
          <li>
            <Link href="/login" className={styles["nav-link"]}>Sign In</Link>
          </li>
          <li>
            <Link href="/signup" className={styles["nav-link"]}>
              Sign Up
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles["nav-link"]}>
              About
            </Link>
          </li>
          <li>
            <Link href="/settings" className={styles["nav-link"]}>
              Settings
            </Link>
          </li>
          <li>
            <Link href="/data" className={styles["nav-link"]}>
              Data
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
