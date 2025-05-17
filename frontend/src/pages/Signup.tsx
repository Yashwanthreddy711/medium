import React from 'react'
import { Quote } from '../components/Quote'
import { Auth } from '../components/Auth'

type Props = {}

export const Signup = (props: Props) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div>
           <Auth type='signup'/>
      </div>
       <div className='invisible md:visible'>
      <Quote/>
      </div>
    
    </div>
  )
}