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
        <div className="w-full h-full grid grid-cols-3">
           <div className="col-span-2">
            <Editor entry={entry}/>
           </div>
           <div className="border-l border-black/10">
            <div className="px-6 py-10" style={{backgroundColor: color}}>
                <h2 className="text-2xl">Analysis</h2>
            </div>
            <div>
                <ul>
                    {analysisData.map(item => (
                        <li
                            key={item.name}
                            className="px-2 py-2 flex items-center justify-between border-b border-t border-black/10"
                        >
                            <span className="text-lg font-semibold">{item.name}</span>
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