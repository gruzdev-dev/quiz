import { FieldProps } from '@/components/Form'

function FieldSetText({ question, onChange }: FieldProps) {

  const getValue = (): string => {
    return question?.answer ? question.answer[0] : ''
  }

  return (
    <fieldset className='mt-5'>
      <label htmlFor={ `question_${ question.id }` }
             className='contents text-base font-medium text-slate-700'>
        { question.title }
      </label>
      <input
        data-question-id={ question.id }
        value={ getValue() }
        type='text'
        name={ `question_${ question.id }` }
        id={ `question_${ question.id }` }
        onChange={ onChange }
        className='mt-2 py-1 px-2 block w-full border outline-0 rounded-sm border-gray-300 focus:border-teal-700 sm:text-sm'
      />
    </fieldset>
  )
}

export default FieldSetText