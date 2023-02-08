import { Question } from '@/app/features/questionsSlice'

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch('/api/questions')
  if (response.ok) {
    return await response.json()
  }
  return []
}