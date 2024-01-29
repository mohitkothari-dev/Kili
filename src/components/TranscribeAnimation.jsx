import React from 'react'

const TranscribeAnimation = ({downloading}) => {

    const textGradient = `text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300`
    const textStyle = "text-3xl font-bold font-mono py-3 sm:text-4xl md:text-5xl"

  return (
    <main className='flex flex-1 flex-col justify-center p-4 text-center gap-3 sm:gap-4 md:gap-5 max-w-full mx-auto'>
      <div className="flex flex-col">
      <h1 className={`${textStyle} animate-pulse animate-infinite animate-duration-[2000ms] animate-delay-1000 ${textGradient}`}>Transcribing</h1>
      <p>{!downloading ? `Be patient! it's coming your way.` : 'Engaged. '}</p>
      </div>
    </main>
  )
}

export default TranscribeAnimation