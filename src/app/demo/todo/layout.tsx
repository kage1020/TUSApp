import SessionLayout from '@/components/SessionLayout'

import type { Props } from '@/types'

export const metadata = {
  title: 'Todoリスト',
}

const TodoLayout = ({ children }: Props) => {
  return (
    <SessionLayout secured>
      <div className='grid h-screen w-screen place-items-center bg-gray-200'>{children}</div>
    </SessionLayout>
  )
}

export default TodoLayout
