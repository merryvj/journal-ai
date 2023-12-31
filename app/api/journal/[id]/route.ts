import { getUserByClerkId } from "@/utils/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"
import { analyze } from "@/utils/ai"

//updates some properties (PUT is replace)
export const PATCH = async (request: Request, {params}) => {
    const { content } = await request.json()
    const user = await getUserByClerkId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId: user.id,
            id: params.id
        },
        data: {
            content,
        }
     })

     const analysis = await analyze(updatedEntry.content)

     const updated = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        }, 
        create: {
            entryId: updatedEntry.id,
            ...analysis
        },
        update: analysis
     })
    
    return NextResponse.json({data: {...updatedEntry, analysis: updated}})
}