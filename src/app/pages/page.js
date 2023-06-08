'use client'

import Link from 'next/link'
import './main_page.css'

const App = () => {
  return (
    <div>
      <h1 className='title'>谷口研究室</h1>
      <div className='content'>
        <ul className='link'>
          <li>
            <Link href='/pages/todo'>ToDoList</Link>
          </li>
          <li>
            <Link href='/pages/status'>Member_status</Link>
          </li>
          <li>
            <Link href='/pages/WebGL/index.html'>unity</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App
