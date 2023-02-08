import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type Student = {
  email: string,
  status: 'processing' | 'passed' | 'error'
}

const initialState: Student = { email: '', status: 'processing' }
export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setEmail(
      state, { payload }: PayloadAction<string>) {
      state.email = payload
    },
    setStatusToPassed(state) {
      state.status = 'passed'
    },
    setStatusToProcessing(state) {
      state.status = 'processing'
    },
    setStatusToError(state) {
      state.status = 'error'
    }
  }
})

export const studentActions = studentSlice.actions

export const selectStudentEmail = (state: RootState) => state.student.email
export const selectStudentStatus = (state: RootState) => state.student.status

export default studentSlice