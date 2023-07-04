'use client'

import { useContext, useEffect, useRef, useState } from 'react'

import { Box, Card, CardActions, CardContent } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import useSWR from 'swr'

import { PositionContext } from './page'

import './mapbox-gl.css'

type Feature = {
  type: 'Feature'
  properties: { pref: 1; name: '北海道' }
  geometry: {
    type: 'MultiPolygon'
    coordinates: [][][][]
  }
}

const MapContent = ({ col = 1 }: { col: number }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const { setPosition } = useContext(PositionContext)
  const { data } = useSWR('/prefectures.geojson')

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/kage1020/cljea0zsn001301r8equd1hhw',
      center: [139.9, 35.8],
      zoom: 11,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '',
    })

    new mapboxgl.Marker().setLngLat([139.86324, 35.7719]).addTo(map.current)
    map.current.on('styledata', () => {
      console.log('styledata', data)
      if (!map.current || !data) return

      map.current.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: data,
        },
      })
    })
    map.current.on('click', (e) => {
      setPosition(e.lngLat)
    })
  }, [data, setPosition])

  return (
    <Card
      sx={{ height: '100%', width: '100%', gridColumn: `span ${col} / span ${col}` }}
      elevation={5}
    >
      <CardContent sx={{ height: '100%', width: '100%' }}>
        <Box component='div' ref={mapContainer} sx={{ height: '100%', width: '100%' }}></Box>
      </CardContent>
      <CardActions sx={{ display: 'none' }}></CardActions>
    </Card>
  )
}

export default MapContent
