"use client";

import Link from "next/link"; // used for client side navigation btwn pages
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const searchParams = useSearchParams();
  let url = searchParams.get("callbackUrl");
  if (!url) url = "/posts";
  const handleFormSubmission = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    signIn({ email, password }, () => {
      router.push(url);
    });
  }

  return (
    <>
    <h1>
      Login to your acount:
    </h1>
    <form onSubmit={handleFormSubmission}>
      <div className="row">
        <div className="col-label">
          <label htmlFor="email">Email:</label>
        </div>
        <div className="col-input">
          <input type="text" id="email" ref={emailInputRef} />
        </div>
      </div>
      <div className="row">
        <div className="col-label">
          <label htmlFor="password">Password:</label>
        </div>
        <div className="col-input">
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
      </div>
      <input type="submit" value="Sign In" />
    </form>
    <p>
      <span>Don&apos;t have an account? </span>
      <Link href="/signup">Sign Up</Link>
    </p>
    </>
  )
}