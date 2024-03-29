import { JournalEntry } from '@prisma/client'
import { ErrorUI, FullJournalEntry, ResponseWrapper } from './types'

const createUrl = (path: string) => {
  return `${window.location.origin}${path}`
}

export const createNewJournalEntry = async (
  content: string
): Promise<JournalEntry | ErrorUI> => {
  const response = await fetch(new Request(createUrl('/api/journal')), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    return { error: true, message: 'Error creating journal entry' }
  }

  const data: ResponseWrapper<JournalEntry> = await response.json()

  return data.data
}

export const updateJournalEntry = async (
  id: string,
  content: string
): Promise<FullJournalEntry | ErrorUI> => {
  const response = await fetch(new Request(createUrl(`/api/journal/${id}`)), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  if (!response.ok) {
    return { error: true, message: 'Error updating journal entry' }
  }

  const data: ResponseWrapper<FullJournalEntry> = await response.json()

  return data.data
}

export const askQuestion = async (
  question: string
): Promise<string | ErrorUI> => {
  const response = await fetch(new Request(createUrl('/api/question')), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    return { error: true, message: 'Error asking question' }
  }

  const data = await response.json()

  return data.data
}
