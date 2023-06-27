import type { Props } from '@/types'

const DemoLayout = ({ children }: Props) => {
  return <div className='grid h-screen w-screen place-items-center bg-gray-200'>{children}</div>
}

export default DemoLayout
