'use client'

import { createContext, useState } from 'react'

import MapContent from './map'
import Sidebar from './sidebar'

export const PositionContext = createContext({
  position: { lat: 0, lng: 0 },
  setPosition: (position: { lat: number; lng: number }) => {
    return
  },
})

const MapboxPage = () => {
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  return (
    <div className='grid h-full max-h-[720px] min-h-[360px] w-full min-w-[360px] max-w-[1080px] grid-cols-3 gap-4'>
      <PositionContext.Provider value={{ position, setPosition }}>
        <MapContent col={2} />
        <Sidebar />
      </PositionContext.Provider>
    </div>
  )
}

export default MapboxPage
