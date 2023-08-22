import { getUserByClerkId } from "@/utils/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"

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
    
    return NextResponse.json({data: updatedEntry})
}