import { Analysis, JournalEntry } from '@prisma/client'

export type ResponseWrapper<T> = { data: T }

export interface Params {
  id: string
}

export interface ErrorUI {
  error: boolean
  message: string
}

export interface AnalysisDTO {
  mood: string
  summary: string
  color: string
  negative: boolean
  subject: string
}

export interface withAnalysis {
  analysis: Analysis | null
}

export interface FullJournalEntry extends JournalEntry, withAnalysis {}

export interface JournalQAEntry {
  id: string
  content: string
  createdAt: Date
}

export const isErrorUI = (data: any): data is ErrorUI => {
  if (typeof data === 'string') return false

  return 'error' in data
}
