import NewEntryCard from "@/components/NewEntryCard"
import EntryCard from "@/components/EntryCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntries = async () => {
    const user = getUserByClerkId()
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()
    
    return (
        <div className="h-full p-10 bg-slate-400/10">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="grid grid-cols-3 gap-4 p-10">
            <NewEntryCard/>
            {entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry}/>
            ))}
        </div>
        </div>
    )
}

export default JournalPage