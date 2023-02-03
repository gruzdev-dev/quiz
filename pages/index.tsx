import Head from 'next/head'
import FieldSetText from '@/components/FieldSetText'
import FieldSetCheckBox from '@/components/FieldSetCheckBox'
import FieldSeRadio from '@/components/FieldSetRadio'
import { ChangeEvent, useEffect } from 'react'
import {
  selectQuestions,
  questionActions,
  Question
} from '@/app/questionsSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

export type FieldProps = {
  question: Question,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type GetAnswerParams = {
  questionId: number,
  type: string,
  value: string,
}

function Home() {
  const dispatch = useAppDispatch()
  const questions: Question[] = useAppSelector(selectQuestions)

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
      questionId: +e.target.dataset.questionId,
      type: e.target.type,
      value: e.target.value
    }
    dispatch(questionActions.setAnswer({
      questionId: params.questionId, answer: getNewAnswer(params)
    }))
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

  useEffect(() => {
    const data = [
      {
        id: 1,
        title: 'test checkbox',
        type: 'checkbox',
        answers: [
          'test1',
          'test2',
          'test3'
        ]
      },
      {
        id: 2,
        title: 'test text',
        type: 'text'
      },
      {
        id: 3,
        title: 'test radio',
        type: 'radio',
        answers: [
          'test5',
          'test6',
          'test7'
        ]
      }
    ] as Question[]

    dispatch(questionActions.setQuestions(data))

  }, [])

  return (
    <>
      <Head>
        <title>quiz</title>
        <meta name='description' content='Generated by create next app'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>
      <main className='md:container md:mx-auto'>
        <form className='p-5 pb-9 rounded-md max-w-2xl md:mx-auto shadow-md'>
          <h1 className='text-teal-700 text-lg font-bold'>Test</h1>
          {
            questions.map((question: Question) => getFieldByType(question))
          }
        </form>
      </main>
    </>
  )
}

export default Home
