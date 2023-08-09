'use client'

import Link from 'next/link'

import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import Divider from '@mui/joy/Divider'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'

export default function Home() {
  return (
    <Card variant='outlined' size='lg'>
      <Typography sx={{ fontSize: { xs: '1.5rem', md: '2.25rem' }, fontWeight: 700 }}>
        Welcome to TUSApp by 谷口研究室
      </Typography>
      <Sheet sx={{ pt: '2rem' }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems='center'>
            <Link href='/todo'>
              <Button sx={{ width: '10rem' }}>ToDo List</Button>
            </Link>
            <Typography sx={{ flex: 1 }}>個人ごとのToDoリストを作成できます。</Typography>
          </Stack>
          <Divider />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems='center'>
            <Button sx={{ width: '10rem' }} disabled>
              Member Status
            </Button>
            <Typography sx={{ flex: 1 }}>
              研究室のメンバーの在室/退室を管理できます。(Coming Soon)
            </Typography>
          </Stack>
          <Divider />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems='center'>
            <Link href='/pose'>
              <Button sx={{ width: '10rem' }}>Pose Estimation</Button>
            </Link>
            <Typography sx={{ flex: 1 }}>カメラの映像から3D姿勢推定を行います。</Typography>
          </Stack>
        </Stack>
      </Sheet>
    </Card>
  )
}
