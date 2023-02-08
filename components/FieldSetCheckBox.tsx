import { FieldProps } from '@/components/Form'

function FieldSetCheckBox({ question, onChange }: FieldProps) {

  const getChecked = (answer: string): boolean => {
    return !!(question?.answer && question.answer.includes(answer))
  }

  return (
    <fieldset className='mt-5'>
      <legend
        className='contents text-base font-medium text-slate-700'>
        { question.title }
      </legend>
      { question?.answers && question.answers.map((answer, i) =>
        <div
          key={ `${ question.id }_${ answer }` }
          className='flex items-center mt-2'>
          <input
            data-question-id={ question.id }
            value={ answer }
            checked={ getChecked(answer) }
            id={ `${ question.id }_${ i }` }
            name={ `${ question.id }_${ i }` }
            type='checkbox'
            onChange={ onChange }
            className='h-4 w-4 border-gray-300 accent-teal-700 shrink-0'
          />
          <label htmlFor={ `${ question.id }_${ i }` }
                 className='ml-3 block text-sm font-medium text-slate-600'>
            { answer }
          </label>
        </div>
      )
      }
    </fieldset>
  )
}

export default FieldSetCheckBox