import { Suspense } from 'react'

import Skelton from '@/components/Skeleton'

import Todo from './todo'

const TodoPage = async () => {
  return (
    <div className='w-full min-w-[360px] max-w-[720px]'>
      <Suspense fallback={<Skelton />}>
        <Todo />
      </Suspense>
    </div>
  )
}

export default TodoPage
