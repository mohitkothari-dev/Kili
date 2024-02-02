import { useState, useEffect, useRef } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import FileDisplay from './components/FileDisplay'
import Result from './components/Result'
import TranscribeAnimation from './components/TranscribeAnimation'
import { MessageTypes } from './utils/presets'

function App() {

  const [file,setFile] = useState(null)
  const [audioStream,setAudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const isAudioAvailable = file || audioStream  //live audio or a uploaded file needs to be there

  function handleAudioReset ()  {
    setFile(null)
    setAudioStream(null)
  } 


  //ML code using web worker
  // useRef becuase I don't want a new render for a backend logic. I don't want to change anythin on the frontend
  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }
    const onMessageReceived = async (e) => {
      switch(e.data.type){
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
          case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
          case 'RESULT':
          setOutput(e.data.results)
          console.log(e.data.results)
          break;
          case 'INFERENCE_DONE':
          setFinished(true)
          console.log('DONE')
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  },[])

  const readAudioFrom = async (file) => {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({
      sampleRate: sampling_rate
    }) 
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  const handleFormSubmission = async () => {
    if (!file && !audioStream) { return }
    let audio = await readAudioFrom( file? file : audioStream )
    const model_name = 'openai/whisper-tiny.en'

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
  <section className='min-h-screen flex flex-col'>
    <Header></Header>
    {
      output ? (
        <Result output={output}></Result> 
      ) :
      loading ? (
        <TranscribeAnimation></TranscribeAnimation> 
      ) : 
      isAudioAvailable ? (
        <FileDisplay file={file} audioStream={setAudioStream} handleAudioReset={handleAudioReset} handleFormSubmission={handleFormSubmission}></FileDisplay>
      ) : (
        <HomePage setFile={setFile} setAudioStream={setAudioStream}></HomePage>
      )
    }
  </section>
  <footer>
    {/* Footer content */}
  </footer>
</div>

      
  )
}

export default App
