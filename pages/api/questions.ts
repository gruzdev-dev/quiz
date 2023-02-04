import type { NextApiRequest, NextApiResponse } from 'next'
import { Question } from '@/app/features/questionsSlice'
import path from 'path'
import { promises as fs } from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question[]>
) {
  let questions: Question[] = []
  try {
    const jsonData = await getQuestionsFromJson()
    questions = jsonData.map(question => {
      return {
        id: question.id,
        type: question.type,
        title: question.title,
        answers: question?.answers
      }
    })
  } catch(e) {
    //
  }
  res.status(200).json(questions)
}

export async function getQuestionsFromJson(): Promise<Question[]> {
  const jsonDirectory = path.join(process.cwd(), 'json')
  return JSON.parse(
    await fs.readFile(jsonDirectory + '/questions.json',
      'utf8')) as Question[]
}
