import React from 'react'
import evertoneLogo from '../assets/evertone_logo.png';
const Footer = () => {
  return (
    <footer className="bg-stone-900 text-amber-100 py-6 mt-auto text-xs  px-6 sm:text-base ">
                <div className='flex flex-col items-center'>

                    <h3 className="text-xl font-bold font-serif text-white "><img className='w-30 mb-5' src={evertoneLogo} alt="" /></h3>
                    <p className='text-white'>Electron: Powering Your Tomorrow..</p>
                </div>

                <div className="text-center mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs sm:text-sm">&copy; 2025 Electron. All rights reserved.</p>
                </div>
            </footer>
  )
}

export default Footer
