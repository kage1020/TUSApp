import { Suspense } from 'react'

import SessionLayout from '@/components/SessionLayout'
import Skelton from '@/components/Skeleton'

import Todo from './todo'

export const metadata = {
  title: 'Todoリスト',
}

const TodoPage = async () => {
  return (
    <SessionLayout secured>
      <div className='w-full min-w-[360px] max-w-[720px]'>
        <Suspense fallback={<Skelton />}>
          <Todo />
        </Suspense>
      </div>
    </SessionLayout>
  )
}

export default TodoPage
