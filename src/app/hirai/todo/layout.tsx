import type { Props } from '@/types'

export const metadata = {
  title: 'Todoリスト',
}

const TodoLayout = ({ children }: Props) => {
  return <div className='grid h-screen w-screen place-items-center bg-gray-200'>{children}</div>
}

export default TodoLayout
