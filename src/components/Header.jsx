import React from 'react'

const Header = () => {
  return (
    <nav className='flex items-center border-b border-solid border-slate-50 justify-between gap-4 p-4'>
      <a href="/"><h1 className='bold font-medium flex items-center text-3xl'><span className=''>🦜</span>  Kili</h1></a>
      {/* <button className='flex items-center gap-2 specialBtn px-4 py-2 rounded-lg '>
        <i className="fa-solid fa-plus"></i>
        <p>New</p>
      </button> */}
    </nav>
  )
}

export default Header