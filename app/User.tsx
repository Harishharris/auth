"use client"

import { useSession } from "next-auth/react"

export default function User() {
  const { data: sessionData } = useSession()

  return (
    <div>
      <pre>{JSON.stringify(sessionData)}</pre>
    </div>
  )
}
