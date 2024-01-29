import React from 'react'
import { LANGUAGES } from '../../utils/presets'

const Translation = (props) => {

  const { textElement, toLanguage, translating, setToLanguage, generateTranslation } = props

  return (
    <div className='flex flex-col w-full mx-auto'>
      {!translating && (<div className='flex flex-col items-stretch'>
        <select className='flex-1 bg-transparent border-none my-2' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
          <option value={`Select language`} className='bg-slate-800 text-slate-100'>Select Language</option>
          {Object.entries(LANGUAGES).map(([key, value]) => {
            return (
              <option key={key} value={value} className='bg-slate-800 text-slate-100'>{key}</option>
            )
          })}
        </select>
        <button onClick={generateTranslation} className='specialBtn px-3 py-2 rounded-lg duration-200 mt-6'>Translate</button>
      </div>)}
      {(textElement && !translating) && (
        <p>{textElement}</p>
      )}
      {
        translating && (
          <div className='grid place-items-center'>
            <i className="fa-solid fa-spinner animate-spin"></i> 
          </div>
        )
      }
    </div>
  )
}

export default Translation