'use client'

import { useEffect, useRef, useState } from 'react'

import axios from 'axios'
import Webcam from 'react-webcam'

const PostImagePage = () => {
  const [image, setImage] = useState<string>('')
  const camRef = useRef<Webcam>(null)

  const submitImage = async () => {
    if (!camRef.current) return
    const imageBase = camRef.current.getScreenshot()
    if (!imageBase) return
    const res = await axios.post('/api/pose/predict', { image: imageBase })
    if (res.status !== 200) setImage(imageBase || '')
    else setImage('data:image/png;base64,' + res.data)
  }

  // useEffect(() => {
  //   setInterval(submitImage, 1000)
  // }, [])

  return (
    <div className='flex items-center justify-center'>
      <Webcam ref={camRef} mirrored />
      <img src={image} />
    </div>
  )
}

export default PostImagePage
