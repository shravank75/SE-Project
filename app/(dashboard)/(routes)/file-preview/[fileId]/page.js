'use client'
import { useEffect, useState } from 'react'
import { ArrowLeftSquare } from 'lucide-react'
import Link from 'next/link'
import FileInfo from './_components/FileInfo'
import FileShareForm from './_components/FileShareForm'
import { use } from 'react'
import { Client, Databases, ID } from 'appwrite'

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

const databases = new Databases(client)

function FilePreview({ params }) {
  const { fileId } = use(params)
  const [file, setFile] = useState(null)

  useEffect(() => {
    if (fileId) {
      getFileInfo()
    }
  }, [fileId])

  const getFileInfo = async () => {
    try {
      const res = await databases.getDocument(
        process.env.NEXT_PUBLIC_DB_ID,
        process.env.NEXT_PUBLIC_COLLECTION_ID,
        fileId
      )
      setFile(res)
    } catch (err) {
      console.error('No such document:', err)
    }
  }

  const onPasswordSave = async (password) => {
    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DB_ID,
        process.env.NEXT_PUBLIC_COLLECTION_ID,
        fileId,
        {
          password: password,
        }
      )
      setFile((prev) => ({ ...prev, password }))
    } catch (err) {
      console.error('Failed to save password', err)
    }
  }

  return (
    <div className="py-10 px-20">
      <Link href="/upload" className="flex gap-3">
        <ArrowLeftSquare /> Go to Upload
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
        <FileInfo file={file} />
        <FileShareForm file={file} onPasswordSave={onPasswordSave} />
      </div>
    </div>
  )
}

export default FilePreview
