import { Document } from '@langchain/core/documents'
import { PromptTemplate } from '@langchain/core/prompts'
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { loadQARefineChain } from 'langchain/chains'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import zod from 'zod'
import { AnalysisDTO, JournalQAEntry } from '../types'

const parser = StructuredOutputParser.fromZodSchema(
  zod.object({
    mood: zod
      .string()
      .describe(
        `Required field should always have a value.The mood of the person who wrote the journal entry. Should be connected with the color. Examples:
          passion, love, excitement, anger, danger
          joy, enthusiasm, creativity, warmth
          happiness, optimism, hope, energy
          nature, peace, calmness, growth
          trust, loyalty, intelligence, sadness
          luxury, mystery, creativity, wisdom
          love, romance, femininity, gentleness
          sophistication, elegance, mystery, death
          purity, innocence, cleanliness, simplicity
        `
      )
      .default('neutral'),
    subject: zod
      .string()
      .describe(
        'Required field should always have a value. The subject of the journal entry'
      )
      .default('Unknown'),
    summary: zod
      .string()
      .describe(
        'Required field should always have a value. Quick summary of the entire journal entry'
      )
      .default('Unknown'),
    color: zod
      .string()
      .describe(
        `Required field should always have a value. A hexadecimal color representing the mood of the journal entry, you can usee one or more moods at one time. Example:
        #FF0000: passion, love, excitement, anger, danger
        #FFA500: joy, enthusiasm, creativity, warmth
        #FFFF00: happiness, optimism, hope, energy
        #00FF00: nature, peace, calmness, growth
        #0000FF: trust, loyalty, intelligence, sadness
        #A020F0: luxury, mystery, creativity, wisdom
        #FFC0CB: love, romance, femininity, gentleness
        #000000: sophistication, elegance, mystery, death
        #FFFFFF: purity, innocence, cleanliness, simplicity`
      )
      .default('#ffffff'),
    negative: zod
      .boolean()
      .describe(
        'Required field should always have a value. Whether the journal entry is negative or not(i.e does it contain negative emotions?)'
      )
      .default(false),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. All fields are required. Do not leave them blank even it has a default values. It always should be values. If you cannot define the value use neutral tone. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (content: string): Promise<AnalysisDTO> => {
  const prompt = await getPrompt(content)
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
  })

  const response = await model.invoke(prompt)

  try {
    const message = `${response.content}`
    const result = parser.parse(message)

    return result
  } catch (error) {
    throw Error(`Failed to parse response: ${error}`)
  }
}

export const qa = async (question: string, entries: JournalQAEntry[]) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { id: entry.id, createdAt: entry.createdAt },
      })
  )

  const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)

  const response = await chain.invoke({
    input_documents: relevantDocs,
    question,
    prompt: 'Talk like a mental assistant',
  })

  return response.output_text
}
