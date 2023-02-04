import { FieldProps } from '@/components/Form'

function FieldSeRadio({ question, onChange }: FieldProps) {

  const getChecked = (answer: string): boolean => {
    return !!(question?.answer && question.answer.includes(answer))
  }

  return (
    <fieldset className='mt-5'>
      <legend
        className='contents text-base font-medium text-slate-700'>
        { question.title }
      </legend>
      { question?.answers && question.answers.map(answer =>
        <div
          key={ `${ question.id }_${ answer }` }
          className='flex items-center mt-2'>
          <input
            data-question-id={ question.id }
            value={ answer }
            checked={ getChecked(answer) }
            id={ `${ question.id }_${ answer }` }
            name={ `radio_${ question.id }` }
            type='radio'
            onChange={ onChange }
            className='h-4 w-4 border-gray-300 accent-teal-700'
          />
          <label htmlFor={ `radio_${ question.id }` }
                 className='ml-3 block text-sm font-medium text-slate-600'>
            { answer }
          </label>
        </div>
      )
      }
    </fieldset>
  )
}

export default FieldSeRadio