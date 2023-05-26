import React from 'react'
// import { NavLink, Outlet } from 'react-router-dom'
import Link from 'next/link'
 
const Layout: React.FC = () => {
    return (
        <div>
            <h1 className="head">谷口研究室</h1>
            <div className="content">
                <ul className = "link">
                    <li><Link href="/">ToDoList</Link></li>
                    <li><Link href="/posts">Member_status</Link></li>
                </ul>                
            </div>
        </div>
    )
}
 
export default Layout