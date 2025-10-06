"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { Storage, ID, Permission, Databases, Client } from 'appwrite'
import { useUser } from '@clerk/nextjs'
import { generateRandomString } from './../../../_utils/GenerateRandomString'
import CompleteCheck from './_components/CompleteCheck'
import { useRouter } from 'next/navigation'

function Upload() {
  const { user } = useUser()
  const [progress, setProgress] = useState(0)
  const [fileDocId, setFileDocId] = useState('')
  const [uploadCompleted, setUploadCompleted] = useState(false)
  const [fileUrl, setFileUrl] = useState('')

  const router = useRouter()

  // Initialize Appwrite Client
  const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

  const storage = new Storage(client)
  const databases = new Databases(client)

  const uploadFile = async (file) => {
    if (!file) return

    setProgress(0)
    setUploadCompleted(false)
    setFileUrl('')

    try {
      // Upload file to Appwrite Storage with unique ID
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        ID.unique(),
        file,
        [Permission.read('any')] // Public read permission
      )

      // Simulate progress (Appwrite SDK currently lacks upload progress events)
      let simulatedProgress = 0
      const interval = setInterval(() => {
        simulatedProgress += 10
        if (simulatedProgress >= 90) {
          clearInterval(interval)
          setProgress(90)
        } else {
          setProgress(simulatedProgress)
        }
      }, 200)

      // After small delay, mark as 100%
      setTimeout(() => {
        setProgress(100)
        setUploadCompleted(true)
      }, 2000)

      // Construct the download URL for the uploaded file
      const url = `https://nyc.cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
      setFileUrl(url)

      // Save file metadata to Appwrite database
      await saveInfo(file, url)

    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed.')
    }
  }

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString()
    await databases.createDocument(
      process.env.NEXT_PUBLIC_DB_ID,
      process.env.NEXT_PUBLIC_COLLECTION_ID,
      docId,
      {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: fileUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress || '',
        userName: user?.fullName || '',
        password: '',
        id: docId,
        shortUrl: process.env.NEXT_PUBLIC_SHORT_URL + docId,
      }
    )
    setFileDocId(docId)
  }

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setUploadCompleted(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [progress])

  useEffect(() => {
    if (uploadCompleted && fileDocId) {
      const timer = setTimeout(() => {
        router.push('/file-preview/' + fileDocId)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [uploadCompleted, fileDocId, router])

  return (
    <div className='p-5 px-8 md:px-28 text-center'>
      {!uploadCompleted ? (
        <>
          <h2 className='text-[20px] text-center m-5'>
            Start{' '}
            <strong className='text-primary'>
              Uploading
            </strong>{' '}
            File and <strong className='text-primary'>Share</strong> it
          </h2>

          <UploadForm
            uploadBtnClick={(file) => uploadFile(file)}
            progress={progress}
          />
        </>
      ) : (
        <CompleteCheck />
      )}
    </div>
  )
}

export default Upload
