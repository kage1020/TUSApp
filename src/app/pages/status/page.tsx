// import Mem_status from './mem_status'
import Sidemenu from '../side_menu/menu'

import Table from './table'

import './status.css'

const Page_status = () => {
  return (
    <div>
      <h1 className='title'>谷口研究室ーb4在室状況確認画面</h1>
      <div className='side_content'>
        <div className='sidemenu'>
          <Sidemenu />
        </div>
        <div className='maincontent'>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Page_status
