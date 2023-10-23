import { hash, compare } from "bcryptjs";
// hashing is a verb that means converting an input into another input;
// systematic encryption; compression is one example

export async function hashPassword(plainPassword) {
  return await hash(plainPassword, 12); // salt(12) = random bits added before hashing
}

export async function comparePasswords(plainPassword, hashedPassword) {
  return await compare(plainPassword, hashedPassword); // checking if the plain password is the same as the hashed
}