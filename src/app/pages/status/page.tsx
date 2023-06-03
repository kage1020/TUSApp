// import Mem_status from './mem_status'
import Header from '@/components/header'
import Sidemenu from '@/components/sidemenu'

import MemberStatus from './memberstatus'

import './new.css'
import '@/components/layout.css'

const Page_status = () => {
  return (
    <div>
      <Header />
      <div className='content'>
        <div className='sidemenu'>
          <Sidemenu />
        </div>
        <div className='maincontent'>
          <MemberStatus />
        </div>
      </div>
    </div>
  )
}

export default Page_status
