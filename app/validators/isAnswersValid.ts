import { RequestAnswer } from '@/pages/api/request'

export const isAnswersValid = (answers: RequestAnswer[]): boolean => {
  let valid = true
  for(const answer of answers) {
    if (!valid) {
      break
    }
    if (!Number.isInteger(+answer.question_id)) {
      valid = false
      break
    }
    if (answer?.answer && answer.answer.length > 0) {
      for(const str of answer.answer) {
        if (!/[?!,.№a-zA-Zа-яА-ЯёЁ0-9\s]/gu.test(str)) {
          valid = false
          break
        }
      }
    } else {
      valid = false
      break
    }
  }

  return valid
}