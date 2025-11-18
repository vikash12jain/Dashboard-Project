import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-amber-100 py-6 mt-auto text-xs  px-6 sm:text-base ">
                <div className='flex flex-col items-center'>
                    <h3 className="text-xl font-bold font-serif text-white ">ARTISAN</h3>
                    <p className='text-white'>At ARTISAN, we believe every product has a story. They're all made by hand, with heart, to support the talented artists who create them.</p>
                </div>

                <div className="text-center mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs sm:text-sm">&copy; 2025 ARTISAN. All rights reserved.</p>
                </div>
            </footer>
  )
}

export default Footer
