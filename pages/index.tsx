import Head from 'next/head'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Form from '@/components/Form'
import { useEffect, useState } from 'react'
import { questionActions } from '@/app/features/questionsSlice'
import { RootState } from '@/app/store'
import {
  selectStudentStatus,
  studentActions
} from '@/app/features/studentSlice'
import { fetchQuestions } from '@/app/fetch/questions'
import Loader from '@/components/Loader'
import { RequestData } from '@/pages/api/request'
import { fetchRequest } from '@/app/fetch/request'
import FinalState from '@/components/FinalState.jsx'
import ErrorState from '@/components/ErrorState.jsx'

function Home() {
  const FINAL_DELAY_IN_SECONDS: number = 60
  const status: string = useAppSelector(selectStudentStatus)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const setQuestionsToStore = async (): Promise<void> => {
    const nowTimeStamp: number = getNowTimestamp()
    const finalDelayTimeStamp: number = Number(
      localStorage.getItem('passed')) || nowTimeStamp

    if (nowTimeStamp < finalDelayTimeStamp) {
      dispatch(studentActions.setStatusToPassed())
      return
    }

    const jsonStore: string | null = localStorage.getItem('state')
    if (jsonStore === null) {
      const questions = await fetchQuestions()
      dispatch(questionActions.setQuestions(questions))
    } else {
      const jsonStore: string = localStorage.getItem('state') || '{}'
      const store: RootState = JSON.parse(jsonStore)
      console.log(store)
      dispatch(questionActions.setQuestions(store.questions.data))
      dispatch(studentActions.setEmail(store.student.email))
      if (store.questions.data.length === 0) {
        const questions = await fetchQuestions()
        dispatch(questionActions.setQuestions(questions))
      }
    }
  }

  const getNowTimestamp = (): number => {
    return Number((Date.now() / 1000).toFixed(0))
  }

  const clearState = (): void => {
    dispatch(questionActions.setQuestions([]))
    dispatch(studentActions.setEmail(''))
    localStorage.clear()
  }

  const startRequest = async (data: RequestData): Promise<void> => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    const isSuccessfully = await fetchRequest(data)
    if (isSuccessfully) {
      dispatch(studentActions.setStatusToPassed())
      clearState()
      localStorage.setItem('passed',
        String(getNowTimestamp() + FINAL_DELAY_IN_SECONDS))
    } else {
      dispatch(studentActions.setStatusToError())
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setQuestionsToStore().then(() => {
      setIsLoading(false)
    })
  }, [])

  const getStateByStatus = () => {
    switch(status) {
      case 'passed':
        return <FinalState/>
      case 'error':
        return <ErrorState/>
      default:
        return <Form startRequest={ startRequest }/>
    }
  }

  return (
    <>
      <Head>
        <title>quiz</title>
        <meta name='description' content='Generated by create next app'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>
      <main
        className='md:container md:mx-auto min-h-screen flex justify-center items-center'>
        {
          isLoading ? <Loader/> : getStateByStatus()
        }
      </main>
    </>
  )
}

export default Home