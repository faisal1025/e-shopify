import React from 'react'
import notFound from '../../src/assets/home/404.png'

const NoPage = () => {
    return (
      <>
          <div className='flex flex-col justify-center items-center min-h-screen min-w-full'>
              <img src={notFound} alt="no-result" style={{width: '200px', height: '200px', marginBottom: '3rem'}} />
              <div className='font-semibold'> Page Not Found 404 </div>
          </div>
      </>
    )
}

export default NoPage
