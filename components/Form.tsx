import FieldSetText from '@/components/FieldSetText'
import FieldSetCheckBox from '@/components/FieldSetCheckBox'
import FieldSeRadio from '@/components/FieldSetRadio'
import { ChangeEvent } from 'react'
import {
  selectQuestions,
  questionActions,
  Question
} from '@/app/features/questionsSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectStudentEmail, studentActions } from '@/app/features/studentSlice'

export type FieldProps = {
  question: Question,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type GetAnswerParams = {
  questionId: number,
  type: string,
  value: string,
}

function Form() {
  const dispatch = useAppDispatch()
  const questions: Question[] = useAppSelector(selectQuestions)
  const email: string = useAppSelector(selectStudentEmail)

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
      value: e.target.value.replace(/[^?!,.№a-zA-Zа-яА-ЯёЁ0-9\s]/gu,
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
    <form className='p-5 pb-9 rounded-md max-w-2xl md:mx-auto shadow-md'>
      <h1 className='text-teal-700 text-lg font-bold'>Test</h1>
      <fieldset className='mt-5'>
        <label htmlFor='email'
               className='contents text-base font-bold text-slate-700'>
          Введите email
        </label>
        <input
          value={ email }
          type='text'
          name='email'
          id='email'
          onChange={ changeEmailHandler }
          className='mt-2 py-1 px-2 block w-full border outline-0 rounded-sm border-gray-300 focus:border-teal-700 sm:text-sm'
        />
      </fieldset>
      {
        questions.map((question: Question) => getFieldByType(question))
      }
    </form>
  )
}

export default Form
