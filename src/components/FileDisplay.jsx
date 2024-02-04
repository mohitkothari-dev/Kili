import React, { useEffect, useRef } from 'react'

const FileDisplay = ({ file, audioStream, handleAudioReset, handleFormSubmission }) => {
    const textGradient = "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300"

    const audioRef = useRef()

    useEffect(() => {
      if (!file && !audioStream) { return }   //ideal state - if nothing is uploaded
      if (file) {
          audioRef.current.src = URL.createObjectURL(file)
      } else {
          audioRef.current.src = URL.createObjectURL(new Blob([audioStream]))
      }
  }, [audioStream, file])

  return (
    <main className='flex-1 p-4 text-center flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 max-w-full mx-auto'>
      <h1 className={`text-3xl font-bold font-mono py-3 sm:text-4xl md:text-5xl ${textGradient}`}>Your File</h1>
      <div className='my-4 flex flex-col items-center'>
        <h3 className='font-semibold'>Name</h3>
        <p>{file ? file?.name : 'Your audio'}</p>
      </div>
      <div className='flex flex-col mb-2'>
        <audio ref={audioRef} className='w-full' controls>
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <button onClick={handleAudioReset} className={`${textGradient}`}>Reset</button>
        <button onClick={handleFormSubmission} className='specialBtn px-4 py-2 rounded-lg flex items-center gap-2 font-medium'>
        <i className="fa-solid fa-audio-description"></i>
          <p>Transcribe</p>
        </button>
      </div>
    </main>  
  )
}

export default FileDisplay