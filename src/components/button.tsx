// import type ReactNode from 'react'
// import { Children } from 'react'

// const button = ({propsの中身}: {propsの中身のtypescriptの型の定義}) => {
//     return (
//         <button s>
//             {Children}
//         </button>
//     )
// }

// const button = ({ onClick, children }: { onClick: () => void; children: string }) => {
//   return <button onClick={onClick}>{children}</button>
// }

// export default button
import React from 'react'

import Button from '@mui/material/Button'
// import Stack from '@mui/material/Stack'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const MainButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <Button variant='outlined' onClick={onClick}>
      {children}
    </Button>
  )
}

export default MainButton
