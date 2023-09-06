import NewEntryCard from "@/components/NewEntryCard"
import EntryCard from "@/components/EntryCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { analyze } from "@/utils/ai"
import Question from "@/components/Question"

const getEntries = async () => {
  const user = await getUserByClerkId()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })


  return data
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="h-full p-10 bg-slate-400/10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage