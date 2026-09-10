'use client'
import React, { useEffect, useState } from 'react'
import { Client, Databases } from 'appwrite'
import FileItemC from './_components/FileItemC'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

function FileView() {
  const { fileId } = useParams() // ✅ get route param

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://nyc.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')

  const databases = new Databases(client)
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (fileId) {
      getFileInfo(fileId)
    }
  }, [fileId])

  const getFileInfo = async (id) => {
    try {
      const doc = await databases.getDocument(
        process.env.NEXT_PUBLIC_DB_ID,
        process.env.NEXT_PUBLIC_COLLECTION_ID,
        id
      )
      setFile(doc)
    } catch (error) {
      console.error('No such document:', error)
      setFile(null)
    }
  }

  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={150} height={100} />
      </Link>
      {file ? <FileItemC file={file} /> : <p>Loading file info...</p>}
    </div>
  )
}

export default FileView
