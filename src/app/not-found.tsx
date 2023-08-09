'use client'

import Image from 'next/image'
import Link from 'next/link'

import Card from '@mui/joy/Card'
import Typography from '@mui/joy/Typography'

export default function NotFound() {
  return (
    <Card sx={{ textAlign: 'center' }} variant='outlined' size='lg'>
      <Image src='/404.svg' alt='404' width={300} height={300} />
      <Typography>Oops! The page you&apos;re looking for doesn&apos;t exist.</Typography>
      <Typography>
        Return to{' '}
        <Link href='/'>
          <Typography sx={{ color: '#156ac6', textDecoration: 'underline' }}>Home</Typography>
        </Link>
        .
      </Typography>
    </Card>
  )
}
