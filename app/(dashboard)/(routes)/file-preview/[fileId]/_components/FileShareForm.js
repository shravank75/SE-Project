'use client'

import { Copy } from 'lucide-react'
import React, { useState } from 'react'
import GlobalApi from './../../../../../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'

function FileShareForm({ file, onPasswordSave }) {
  const [isPasswordEnable, setIsEnablePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { user } = useUser()

  const sendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file?.shortUrl
    }

    GlobalApi.SendEmail(data).then(resp => {
      console.log(resp)
    })
  }

  const onCopyClick = () => {
    navigator.clipboard.writeText(file.shortUrl)
    alert('URL Copied!')
  }

  return file && (
    <div className="flex flex-col gap-4">
      
      {/* Short URL Section */}
      <div>
        <label className="text-sm text-gray-500">Short URL</label>
        <div className="flex gap-3 p-2 border rounded-md items-center justify-between">
          <input
            type="text"
            value={file.shortUrl}
            disabled
            className="bg-transparent outline-none w-full text-gray-600"
          />
          <Copy
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={onCopyClick}
          />
        </div>
      </div>

      {/* Password Toggle */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          defaultChecked={file.password !== ''}
          onChange={(e) => setIsEnablePassword(e.target.checked)}
        />
        <label className="text-sm">Enable Password?</label>
      </div>

      {/* Password Input */}
      {isPasswordEnable && (
        <div className="flex gap-3 items-center">
          <div className="border rounded-md w-full p-2">
            <input
              type="password"
              defaultValue={file.password}
              className="bg-transparent outline-none w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            disabled={password.length < 3}
            onClick={() => onPasswordSave(password)}
          >
            Save
          </button>
        </div>
      )}

      {/* Send Email Form */}
      <div className="border rounded-md p-3 mt-4">
        <label className="text-sm text-gray-500">Send File to Email</label>
        <div className="border rounded-md p-2 mt-2">
          <input
            type="email"
            placeholder="example@gmail.com"
            className="bg-transparent outline-none w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="p-2 bg-blue-500 text-white w-full mt-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          disabled={email.length < 3}
          onClick={sendEmail}
        >
          Send Email
        </button>
      </div>
    </div>
  )
}

export default FileShareForm
