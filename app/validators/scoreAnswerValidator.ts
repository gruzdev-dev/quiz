import { QuestionObj, RequestAnswer } from '@/pages/api/request'

export function getScoresByAnswer(
  answer: RequestAnswer, questions: QuestionObj): number {
  if (questions.hasOwnProperty(answer.question_id)) {
    const question = questions[answer.question_id]

    if (!question?.valid) {
      return 0
    }

    switch(question.type) {
      case 'radio':
        return getRadioScores(question.valid, answer.answer)
      case 'checkbox':
        return getCheckboxScores(question.valid, answer.answer)
      case 'text':
        return getTextScores(question.valid, answer.answer)
      default:
        return 0
    }
  } else return 10
}

function getRadioScores(correct: string[], answer: string[]): number {
  return +(answer.length > 0 && correct.includes(answer[0]))
}

function getCheckboxScores(correct: string[], answer: string[]): number {
  let successfully = 0, failed = 0, corrected = correct.length
  answer.forEach(str => correct.includes(str) ? ++successfully : ++failed)

  if (successfully === corrected && failed === 0) {
    return 1
  } else if (successfully > 0) {
    return 0.5
  } else {
    return 0
  }
}

function getTextScores(correct: string[], answer: string[]): number {
  return 0
}