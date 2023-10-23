"use client";
//two ways to use import and export
//one way is to call files mjs
//other way is to set environmental variables to specify that other files have modules
//in nextjs it sets second way up so we don't have to call things mjs
import { deleteCookie } from "cookies-next";
import CONSTANTS from "@/app/constants";

const useAuth = () => {
  const signUp = ({ email, password, name }, callback) => {
    // callback is function we execute when response done
    const reqBody = { email, password, name };
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === CONSTANTS.RESPONSE_STATUS.OK) {
          if (callback) {
            callback(res);
          }
        }
      })
      .catch((err) => {
        // TODO
      });
  };
  const signIn = ({ email, password }, callback) => {
    const reqBody = { email, password };
    fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((res) => {
        // console.log(res);
        if (res.status === CONSTANTS.RESPONSE_STATUS.OK) {
          if (callback) {
            callback();
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const signOut = () => {
    deleteCookie("next-jwt");
  }
  return { signUp, signIn, signOut };
}; // different way of exporting default function

export default useAuth;

//custom hooks in nextjs are used to encapsulate and reuse logic across components
// called a hook because it can access serverside info but still runs on clientside
