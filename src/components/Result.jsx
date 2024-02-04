import React, { useState, useEffect, useRef } from 'react'
import Transcription from './subComponents/Transcription'
import Translation from './subComponents/Translation'

const Result = (props) => {

  const { output } = props

    const buttonGradient = "bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300"
    const textGradient = `text-transparent bg-clip-text ${buttonGradient}`
    const textStyle = "text-3xl font-bold font-mono py-3 sm:text-4xl md:text-5xl"

    const [tab, setTab] = useState('transcription')

    const [translation, setTranslation] = useState(null)
    const [toLanguage, setToLanguage] = useState('Select Language')
    const [translating, setTranslating] = useState(null)

    const worker = useRef()

    useEffect(() => {
      if (!worker.current) {
        worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
          type: 'module'  
        })
      }
      const onMessageReceived = async (e) => {
        switch(e.data.status){
          case 'initiate':
            console.log('DOWNLOADING')
            break;
            case 'progress':
            console.log('LOADING')
            break;
            case 'update':
            setTranslation(e.data.output)
            console.log(e.data.output)
            break;
            case 'complete':
            setTranslating(false)
            console.log('DONE')
            break;
        }
      }
  
      worker.current.addEventListener('message', onMessageReceived)
  
      return () => worker.current.removeEventListener('message', onMessageReceived)
    },[])

    const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || 'No Translation'

    const handleCopy = () => {
      navigator.clipboard.writeText(textElement)
    }

    const handleDownload = () => {
      const element = document.createElement('a')
      const file = new Blob([], {type: 'text/plain'})
      element.href = URL.createObjectURL(file)
      element.download = `Kili_${new Date().toString()}.txt`
      document.body.appendChild(element)
      element.click()
    }
    
    const generateTranslation = () => {
      if (translating || toLanguage === 'Select Language') {
        return
      }

      setTranslating(true)

      worker.current.postMessage({
        text: output.map(val => val.text),
        src_language: 'eng_Latin',
        tgt_language: toLanguage

      })
    }

  return (
    <main className='flex flex-1 flex-col justify-center p-4 text-center gap-3 sm:gap-4 md:gap-5 max-w-full mx-auto'>
      <div className="flex flex-col">
            {output && tab === 'transcription'
            ?
            <>
            <h1 className={`${textStyle} animate-jump-in animate-thrice animate-duration-[4500ms] animate-delay-1000 ${textGradient}`}>Transcribed</h1>
            <p>Congratulations! Your transcription is ready.</p>
            </>
            : 
            output && tab === 'translation' 
            ?
            <>
            <h1 className={`${textStyle} animate-jump-in animate-thrice animate-duration-[4500ms] animate-delay-1000 ${textGradient}`}>Translate</h1>
            <p>Translate your text in any language.</p>
            </>
            :
            ''
            }
        </div>
        {
          output 
          ?
          <div className='grid grid-cols-2 items-center my-2 mx-auto shadow rounded-full overflow-hidden resultBtnShadow'>
            <button onClick={() => setTab('transcription')} className={`px-4 py-2 font-medium ${tab === 'transcription' ? `${buttonGradient}` : ''}`}>Transcription</button>
            <button onClick={() => setTab('translation')} className={`px-4 py-2 font-medium ${tab === 'translation' ? `${buttonGradient}` : ''}`}>Translation</button>
          </div>
          :
          <></>
        }
        {
          tab === 'transcription'
          ?
          <Transcription {...props} textElement={textElement}></Transcription>
          :
          <Translation {...props} toLanguage={toLanguage} translating={translating} textElement={textElement} setToLanguage={setToLanguage} generateTranslation={generateTranslation}></Translation>
        }
        <div className='flex flex-col my-8'>
        <div className='flex items-center gap-4 mx-auto text-base'>
          <button onClick={handleCopy} title='Copy' className={`px-2 rounded ${textGradient}`}>
          <i className="fa-regular fa-copy"></i>
          </button>
          <button onClick={handleDownload} title='download' className={`px-2 rounded ${textGradient}`}>
          <i className="fa-solid fa-cloud-arrow-down"></i>
          </button>
        </div>
        </div>
    </main>
  )
}

export default Result