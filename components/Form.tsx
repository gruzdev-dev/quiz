import FieldSetText from '@/components/FieldSetText'
import FieldSetCheckBox from '@/components/FieldSetCheckBox'
import FieldSeRadio from '@/components/FieldSetRadio'
import { ChangeEvent, MouseEvent, useState } from 'react'
import {
  selectQuestions,
  questionActions,
  Question
} from '@/app/features/questionsSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectStudentEmail, studentActions } from '@/app/features/studentSlice'
import { ErrorType, validateRequestData } from '@/app/validators/formValidator'
import { RequestAnswer, RequestData } from '@/pages/api/request'
import { fetchRequest } from '@/app/fetch/request'

export type FieldProps = {
  question: Question,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type GetAnswerParams = {
  questionId: number,
  type: string,
  value: string,
}

export type Error = {
  hasError: boolean,
  errorType?: ErrorType
}

function Form() {
  const dispatch = useAppDispatch()
  const questions: Question[] = useAppSelector(selectQuestions)
  const email: string = useAppSelector(selectStudentEmail)
  const [error, setError] = useState<Error>({ hasError: false })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getNewAnswer = (params: GetAnswerParams): string[] => {
    if (params.type === 'checkbox') {
      const question: Question = questions.filter(
        question => question.id === params.questionId)[0]
      return question?.answer ?
        (question.answer.includes(params.value) ? question.answer.filter(
          str => str !== params.value) : [...question.answer, params.value])
        : [params.value]
    } else return [params.value]
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const params: GetAnswerParams = {
      questionId: +(e.target.dataset?.questionId
        ? e.target.dataset.questionId
        : 0),
      type: e.target.type,
      value: e.target.value.replace(/[^-%?_()!,.№a-zA-Zа-яА-ЯёЁ0-9\s]/gu,
        '').slice(0, 200)
    }
    dispatch(questionActions.setAnswer({
      questionId: params.questionId, answer: getNewAnswer(params)
    }))
  }

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(studentActions.setEmail(
      e.target.value.toLowerCase().replace(/[^a-z0-9.@_-]/g, '').slice(0, 50)))
  }

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault()
    if (isLoading) {
      return
    }
    const data = createRequestData()
    const error: ErrorType | null = validateRequestData(data)
    if (error == null) {
      setError({ hasError: false })
      setIsLoading(true)
      await fetchRequest(data)
      setIsLoading(false)
    } else {
      setError({ hasError: true, errorType: error })
    }
  }

  const createRequestData = (): RequestData => {
    const user_answers: RequestAnswer[] = []

    questions.forEach(question => {
      user_answers.push({
        question_id: question.id,
        answer: question?.answer ? question.answer : []
      })
    })

    return { user_email: email, user_answers }
  }

  const getFieldByType = (question: Question) => {
    const props: FieldProps = {
      question, onChange: changeHandler
    }

    switch(question.type) {
      case 'text':
        return <FieldSetText key={ question.id } { ...props } />
      case 'checkbox':
        return <FieldSetCheckBox key={ question.id } { ...props } />
      case 'radio':
        return <FieldSeRadio key={ question.id } { ...props } />
      default:
        return null
    }
  }

  return (
    <form className='p-5 rounded-md max-w-2xl md:mx-auto shadow-md'>
      <h1 className='text-teal-700 text-lg font-bold'>Тестовый контроль по
        дополнительной общеобразовательной программе "Биоакустическая коррекция
        - метод терапии функциональных расстройств ЦНС"</h1>
      <fieldset className='mt-5'>
        <label htmlFor='email'
               className='contents text-base font-bold text-slate-700'>
          Введите email
        </label>
        <input
          placeholder='example@email.ru'
          value={ email }
          type='text'
          name='email'
          id='email'
          onChange={ changeEmailHandler }
          className={ `mt-2 py-1 px-2 block w-full border outline-0 rounded-sm border-gray-300 focus:border-teal-700 sm:text-sm ${ error.hasError &&
          error.errorType === 'NO_VALID_EMAIL' ? 'border-red-500' : '' }` }
        />
      </fieldset>
      {
        questions.map((question: Question) => getFieldByType(question))
      }
      {
        error.hasError && <span
          className='mt-5 text-base block text-red-500'>{ error.errorType === 'NO_VALID_EMAIL' ? 'Введите корректный email' : 'Заполните все поля' }</span>
      }
      <button
        disabled={ isLoading }
        type='submit'
        onClick={ submitHandler }
        className='mt-3 rounded-md block w-full px-2 py-3 text-white bg-emerald-800'>Отправить
      </button>
    </form>
  )
}

export default Form
