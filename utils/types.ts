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

export interface CreatedJournalEntry extends JournalEntry, withAnalysis {}

export const isErrorUI = (data: any): data is ErrorUI => {
  return 'error' in data
}
