'use client'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'

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
