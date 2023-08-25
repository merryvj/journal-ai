import Editor from "@/components/Editor"
import { prisma } from "@/utils/db"
import { getUserByClerkId } from "@/utils/auth"

const getEntry = async (id) => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId: user.id,
            id
        },
        include: {
            analysis: true,
        },
    })

    return entry
}

const EntryPage = async ({params}) => {
    const entry = await getEntry(params.id)
    console.log(entry);
    const {mood, summary, color, negative} = entry.analysis;
    const analysisData = [
        {name: 'Mood', value: mood},
        {name: 'Summary', value: summary},
        {name: 'Negative', value: negative ? 'True' : 'False'},
    ]
    return (
        <div className="w-full h-full">
           <Editor entry={entry}/>
        </div>
    )
}

export default EntryPage