import { PromptTemplate } from '@langchain/core/prompts'
import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import zod from 'zod'
import { AnalysisDTO } from '../types'

const parser = StructuredOutputParser.fromZodSchema(
  zod.object({
    mood: zod
      .string()
      .describe(
        'The mood of the person who wrote the journal entry(i.e happy, sad, disappointed etc)'
      )
      .min(1)
      .default('Unknown'),
    subject: zod
      .string()
      .describe('The subject of the journal entry')
      .min(1)
      .default('Unknown'),
    summary: zod
      .string()
      .describe('Quick summary of the entire journal entry')
      .min(1)
      .default('Unknown'),
    color: zod
      .string()
      .describe(
        'A hexadecimal color representing the mood of the journal entry. Example: #000000 for black'
      )
      .min(1)
      .default('Unknown'),
    negative: zod
      .boolean()
      .describe(
        'Whether the journal entry is negative or not(i.e does it contain negative emotions?)'
      )
      .default(false),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. if you cannot analyze any of the values of the object just leave them blank, like empty string: "" for string type, and false for booleans, Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
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
