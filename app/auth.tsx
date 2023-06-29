"use client"

import { signIn, signOut } from "next-auth/react"

export function SingIn() {
  return <button onClick={() => void signIn()}>Sign In</button>
}

export function SingOut() {
  return <button onClick={() => void signOut()}>Sign Out</button>
}
