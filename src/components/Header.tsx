'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <Sheet
      sx={{
        py: '1rem',
        px: { xs: '1rem', md: '5rem' },
        mb: '15px',
        width: '100%',
        backgroundImage: 'linear-gradient(to right, #209cff 0%, #68e0cf 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link href='/'>
        <Typography
          component='h1'
          sx={{
            color: 'white',
            fontSize: '2.2rem',
            textShadow: '-2px 1.5px 0 #000',
            transform: 'skew(-15deg)',
          }}
        >
          TUSApp
        </Typography>
      </Link>
      <Stack sx={{ display: { xs: 'none', md: 'flex' } }} direction='row' spacing={2}>
        <Link href='/todo'>
          <Button variant={pathname === '/todo' ? 'solid' : 'soft'}>ToDo List</Button>
        </Link>
        <Button disabled variant={pathname === '/status' ? 'solid' : 'soft'}>
          Member Status
        </Button>
        <Link href='/pose'>
          <Button variant={pathname === '/pose' ? 'solid' : 'soft'}>Pose Estimation</Button>
        </Link>
      </Stack>
      {!session && <Button onClick={() => signIn()}>サインイン</Button>}
      {session && (
        <Button variant='soft' onClick={() => signOut()}>
          {' '}
          サインアウト
        </Button>
      )}
    </Sheet>
  )
}
