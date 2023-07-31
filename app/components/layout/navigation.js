import styles from "./navigation.module.css";
import Link from "next/link";

export default function Navigation() {
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
            <Link href="/login" className={styles["nav-link"]}>Sign In</Link>
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
