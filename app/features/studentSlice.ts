import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export type Student = {
  email: string
}

const initialState: Student = { email: '' }
export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setEmail(
      state, { payload }: PayloadAction<string>) {
      state.email = payload
    }
  }
})

export const studentActions = studentSlice.actions

export const selectStudentEmail = (state: RootState) => state.student.email

export default studentSlice