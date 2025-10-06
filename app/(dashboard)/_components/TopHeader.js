import { UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

function TopHeader() {
  return (
    <div className='flex p-5 border-b border-gray-200 items-center justify-between md:justify-end'>
        <AlignJustify className='md:hidden'/>
        <Image src='/logo.svg' width={150} height={100} className='md:hidden' alt=''/>
        <UserButton/>
    </div>
  )
}

export default TopHeader