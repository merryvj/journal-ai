import Image from "next/image"
import Link from "next/link"
import { auth } from "@clerk/nextjs"

export default async function Home() {
  const { userId } = await auth()
  let href= userId ? "/journal" : "/new-user"
  

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Journal :D</h1>
        <p className="text-2xl text-white/60 mb-6"> A really good journal </p>
        <div>
          <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">Get started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
