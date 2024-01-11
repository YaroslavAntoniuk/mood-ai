import { JournalEntry } from '@prisma/client'
import { ResponseWrapper } from './types'

const createUrl = (path: string) => {
  return `${window.location.origin}${path}`
}

export const createNewJournalEntry = async (content: string) => {
  const response = await fetch(new Request(createUrl('/api/journal')), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    throw new Error('Error creating journal entry')
  }

  const data: ResponseWrapper<JournalEntry> = await response.json()

  return data.data
}
