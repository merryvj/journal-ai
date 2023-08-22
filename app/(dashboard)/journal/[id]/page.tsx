import Editor from "@/components/Editor"
import { prisma } from "@/utils/db"
import { getUserByClerkId } from "@/utils/auth"

const getEntry = async (id) => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId: user.id,
            id
        }
    })

    return entry
}

const EntryPage = async ({params}) => {
    const entry = await getEntry(params.id)
    return (
        <div>
            <Editor entry={entry}/>
        </div>
    )
}

export default EntryPage