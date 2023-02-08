import { useAppDispatch } from '@/app/hooks'
import { studentActions } from '@/app/features/studentSlice'

function ErrorState() {
  const dispatch = useAppDispatch()

  return <div className=''>
    <div>Простите, произошла какая-то ошибка. Сервер не отвечает.</div>
    <button onClick={ () => dispatch(
      studentActions.setStatusToProcessing()) }>Попробовать снова
    </button>
  </div>
}

export default ErrorState
