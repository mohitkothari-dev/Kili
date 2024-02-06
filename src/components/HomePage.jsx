import React, {useState, useEffect, useRef} from 'react'
import FeatureList from '../utils/featureList';

const HomePage = ({ setFile, setAudioStream }) => {
  
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [audioChunks, setAudioChunks] = useState([])
  const [duration, setDuration] = useState(0)

  const mediaRecorder = useRef(null)

  const mimeType = 'audio/webm'

  const startRecording = async () => {
    let tempStream

    console.log('Recording Started')
    try {
      // Media devices API
      const stramData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })
      tempStream = stramData
    } catch (error) {
      console.log(error.message)
      return
    }
    setRecordingStatus('recording')

    //create new media recorder instance using the stream
    const media = new MediaRecorder(tempStream, {type: mimeType})
    mediaRecorder.current = media

    mediaRecorder.current.start()
    let localAUdioChunks = []
    mediaRecorder.current.ondataavailable = (e) => {
      if (typeof e.data === 'undefined') { return }
      if (e.data.size === 0) { return }
      localAUdioChunks.push(e.data)
    }
    setAudioChunks(localAUdioChunks)
  }

  async function stopRecording () {
    setRecordingStatus('inactive')
    console.log('Stop Recording')

    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: mimeType})
      setAudioStream(audioBlob)
      setAudioChunks([])
      setDuration(0)
    }
  }

  useEffect(() => {
    if (recordingStatus === 'inactive') {return}
    const interval = setInterval(() => {
      setDuration(current => current+1)
    }, 1000)
    
    return () => clearInterval(interval)
  })

  //Feature list
  const features = ["Record","Transcribe","Translate","Audio"]

  //styling variable
  const textGradient = "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300"

  return (
    <main className='flex-1 p-4 text-center flex flex-col justify-center gap-3 sm:gap-4'>
      <h1 className={`text-4xl font-semibold font-mono py-3 sm:text-5xl md:text-6xl`}><span className={`${textGradient}`}>Inspired by</span>🤗</h1>
      <h3 className='font-medium md:text-lg flex flex-col'>
        <FeatureList elements={features} />
      </h3>
      <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='specialBtn px-4 py-2 rounded-xl flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
        <p>{recordingStatus === 'inactive' ? 'Record an audio clip' : 'Stop recording'}</p>
        <div className='flex items-center gap-2'>
          {duration && (
            <p className='text-sm'>{duration}s</p>
          )}
        <i className={recordingStatus === 'inactive' ? 'fa-solid duration-200 fa-microphone' : 'fa-solid duration-200 fa-microphone text-rose-500'}></i>
        </div>
      </button>
      <p className='text-base'>or</p>
      <button className='specialBtn rounded-xl flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
      <input onChange={(e) => {
        const tempFile = e.target.files[0]
        setFile(tempFile)
      }} type="file" className='file:px-4 file:py-2 file:cursor-pointer cursor-pointer file:border-0 file:bg-slate-950 file:hover:bg-slate-700 file:text-slate-50 rounded-xl' accept='.mp3,.wave'/>
      </button>
      <p className='italic text-slate-400 mt-10'>AI app marketplace, where you'll get apps built using Hugging Face open source models.</p>
    </main>
  )
}

export default HomePage