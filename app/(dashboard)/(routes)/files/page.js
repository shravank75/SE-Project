'use client'
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { Client, Databases, Query } from 'appwrite'
import TotalFileCard from './_components/TotalFileCard'
import FileList from './_components/FileList'
import Link from 'next/link'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://nyc.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')

const databases = new Databases(client)

function Files() {
  const { user } = useUser()
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setFileList([])
      return
    }
    getAllUserFiles()
    
  }, [user])

  const getAllUserFiles = async () => {
    setLoading(true)
    setError(null)
    try {
      const dbId = process.env.NEXT_PUBLIC_DB_ID
      const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID

      if (!dbId || !collectionId) {
        throw new Error('Appwrite DB or Collection ID not configured (NEXT_PUBLIC_DB_ID / NEXT_PUBLIC_COLLECTION_ID)')
      }

      const userEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || user.email

      if (!userEmail) {
        throw new Error('Could not determine user email from Clerk user object')
      }

      
      const res = await databases.listDocuments(dbId, collectionId, [
        Query.equal('userEmail', userEmail)
      ])

      
      setFileList(res.documents ?? [])
    } catch (err) {
      console.error('Failed to fetch Appwrite documents:', err)
      setError(err?.message || 'Failed to fetch files')
      setFileList([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-[20px]'>My Files</h2>
        {/* optional Clerk user button */}
        <UserButton />
      </div>

      {loading && <p>Loading files…</p>}

      {error && <p className='text-red-500'>Error: {error}</p>}

      {!loading && !error && fileList.length === 0 && (
        <>
          <h2 className='mb-6'>You don't have any files</h2>
          <Link
            href={process.env.NEXT_PUBLIC_DOMAIN ?? '/'}
            className='p-2 text-white bg-primary rounded-md mt-7 inline-block'
          >
            Upload Now
          </Link>
        </>
      )}

      {!loading && !error && fileList.length > 0 && (
        <>
          <TotalFileCard totalFile={fileList.length} />
          <FileList fileList={fileList} />
        </>
      )}
    </div>
  )
}

export default Files
