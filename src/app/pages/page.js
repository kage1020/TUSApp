'use client'

import Link from 'next/link'

// import Page_status from './Page_status'
// import Page_todo from '.pages/page'
// import Home from './home'

const App = () => {
  return (
    <div>
      <h1 className='head'>谷口研究室</h1>
      <div className='content'>
        <ul className='link'>
          <li>
            <Link href='/pages/todo'>ToDoList</Link>
          </li>
          <li>
            <Link href='/pages/status'>Member_status</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App
