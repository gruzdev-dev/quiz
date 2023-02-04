import type { NextApiRequest, NextApiResponse } from 'next'
import { Question } from '@/app/features/questionsSlice'
import { getQuestionsFromJson } from '@/pages/api/questions'
import { isEmailValidate } from '@/app/validators/isEmailValidate'
import { isAnswersValid } from '@/app/validators/isAnswersValid'

export type RequestAnswer = {
  question_id: number,
  answer: string[]
}

export type RequestData = {
  user_email: string,
  user_answers: RequestAnswer[]
}

type QuestionObj = {
  [key: number]: Question
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ scores?: number, error?: string }>
) {
  if (req.method === 'POST') {
    const data = req.body as RequestData

    if (!isRequestDataValid(data)) {
      return res.status(422).json({ error: 'validation error' })
    }

    try {
      const questions: Question[] = await getQuestionsFromJson()
      const questionsObj = questions.reduce(
        (acc: QuestionObj, current) => acc[current.id] = current, {})
      const scores: number = data.user_answers.reduce(
        (scores, answer) => scores + getScoresByAnswer(answer, questionsObj), 0)
      return res.status(200).json({ scores })
    } catch(e) {
      return res.status(500).json({ error: 'internal error' })
    }
  } else {
    return res.status(500).json({ error: 'method error' })
  }
}

function isRequestDataValid(data: RequestData): boolean {
  if (!data?.user_email || !data.user_email.trim() ||
    !isEmailValidate(data.user_email)) {
    return false
  } else return isAnswersValid(data?.user_answers || [])
}

function getScoresByAnswer(
  answer: RequestAnswer, questions: QuestionObj): number {
  if (questions.hasOwnProperty(answer.question_id)) {
    const question = questions[answer.question_id]
    switch(question.type) {
      case 'radio':
        return 1
      case 'checkbox':
        return 1
      case 'text':
        return 1
      default:
        return 0
    }
  } else return 0
}


