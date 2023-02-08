import { RequestData } from '@/pages/api/request'

export async function fetchRequest(data: RequestData): Promise<boolean> {
  const response = await fetch('/api/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    console.log(await response.json())
    return true
  } else {
    return false
  }
}