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
    const analysisData = [
        {name: 'Summary', value: ''},
        {name: 'Subject', value: ''},
        {name: 'Mood', value: ''},
        {name: 'Negative', value: false},
    ]
    return (
        <div className="w-full h-full grid grid-cols-3">
           <div className="col-span-2">
            <Editor entry={entry}/>
           </div>
           <div className="border-l border-black/10">
            <div className="bg-blue-300 px-6 py-10">
                <h2 className="text-2xl">Analysis</h2>
            </div>
            <div>
                <ul>
                    {analysisData.map(item => (
                        <li
                            key={item.name}
                            className="flex items-center justify-between"
                        >
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
           </div>
        </div>
    )
}

export default EntryPage