// app/api/usage/route.ts
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const usage = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      usageCount: true,
      usageLimit: true,
    },
  })

  if (!usage) {
    return NextResponse.json({ error: 'Usage data not found' }, { status: 404 })
  }

  return NextResponse.json({ data: usage })
}