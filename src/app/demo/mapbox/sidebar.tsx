'use client'

import { useContext } from 'react'

import { Card, CardActions, CardContent } from '@mui/material'

import { PositionContext } from './page'

const Sidebar = () => {
  const { position } = useContext(PositionContext)

  return (
    <Card sx={{ height: '100%', width: '100%' }} elevation={5}>
      <CardContent sx={{ height: '100%', width: '100%' }}>
        Position: ({position.lat}, {position.lng})
      </CardContent>
      <CardActions sx={{ display: 'none' }}></CardActions>
    </Card>
  )
}

export default Sidebar
