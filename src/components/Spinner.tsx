'use client'

import { CircularProgress, Container } from '@mui/material'

const Spinner = () => {
  return (
    <Container
      sx={{
        width: '100lvw',
        height: '100lvh',
        display: 'grid',
        placeItems: 'center',
        position: 'absolute',
        inset: 0,
      }}
    >
      <CircularProgress size={60} />
    </Container>
  )
}

export default Spinner
