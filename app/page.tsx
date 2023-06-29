import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import User from "./User"
import { SingIn, SingOut } from "./auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className='bg-[#333] text-white min-h-screen p-12'>
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>
      <h1>Client Call</h1>
      <User />
      <SingIn />
      <br />
      <SingOut />
    </main>
  )
}
