import { RequestData } from '@/pages/api/request'
import { isEmailValid } from '@/app/validators/isEmailValid'

export type ErrorType = 'NO_VALID_EMAIL' | 'EMPTY_FIELDS'

export function validateRequestData(data: RequestData): ErrorType | null {

  if (data.user_email.trim().length === 0 || !isEmailValid(data.user_email)) {
    return 'NO_VALID_EMAIL'
  }

  for (const answer of data.user_answers) {
    if (!answer.answer?.length || !answer.answer[0]?.length) {
      return 'EMPTY_FIELDS'
    }
  }

  return null
}