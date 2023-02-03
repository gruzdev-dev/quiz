import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '/store'

type FieldType = 'text' | 'checkbox' | 'radio'

export type Question = {
  id: number,
  type: FieldType,
  title: string,
  answers?: string[]
  valid?: string[]
  answer?: string[]
}

type QuestionsState = { data: Question[] }

const initialState: QuestionsState = { data: [] }
export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions(
      state, { payload }: PayloadAction<Question[]>) {
      state.data = payload
    },
    setAnswer(state, {
      payload: {
        questionId,
        answer
      }
    }: PayloadAction<{ questionId: number; answer: string[] }>) {
      state.data = state.data.map((question: Question) => {
        if (questionId === question.id) {
          return { ...question, answer }
        }
        return question
      })
    }
  }
})

export const questionActions = questionsSlice.actions

export const selectQuestions = (state: RootState) => state.questions.data

export default questionsSlice