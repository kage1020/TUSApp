'use client'
import { useState } from 'react'
import * as React from 'react'

import Time from '@mui/icons-material/Schedule'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import Typography from '@mui/joy/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'

import Button from '@/components/button'

import type Person from '@mui/icons-material/Person'
import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import type { Dayjs } from 'dayjs'

const columns: GridColDef[] = [
  { field: 'id', headerName: '学籍番号', width: 150 },
  { field: 'Name', headerName: '名前', width: 130 },
  { field: 'Date', headerName: '日付', width: 130 },
  { field: 'intime', headerName: '入室時間', width: 130 },
  { field: 'outtime', headerName: '退室時間', width: 130 },
  { field: 'Present', headerName: '在室状況', width: 160 },
]

//field名と変数名は一致させる必要あり
interface Person {
  id: number
  Name: string
  Date: string
  intime: string
  outtime: string
  Present: string
}

const ta_people: Person[] = [
  { id: 4620007, Name: '井上 璃久', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620010, Name: '岩尾 優和', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620013, Name: '石見 椋', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620017, Name: '大田原 秀人', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620030, Name: '片桐 卓巳', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620087, Name: '平井 悠喜', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620094, Name: '丸山 恭弘', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620095, Name: '三橋 薫乃', Date: '', intime: '', outtime: '', Present: '自宅' },
  { id: 4620098, Name: '目黒 圭峻', Date: '', intime: '', outtime: '', Present: '自宅' },
]

const App: React.FC = () => {
  const [id, setId] = useState(0)
  const [status, setStatus] = useState('')
  const [nowTime, setnowTime] = useState('')
  const [people, setPeople] = useState<Person[]>([])
  //Person用のstring
  const [date, setDate] = useState('')
  //calendar
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-05-01'))

  const table_reset = () => {
    setPeople(ta_people)
  }

  const setini = (newValue: Dayjs | null) => {
    if (newValue != null) {
      setPeople(ta_people)
      setValue(newValue)
      setDate(newValue.format('YYYY-MM-DD'))
    }
  }

  const handleidChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue != null) {
      setId(parseInt(newValue, 10))
      console.log(id)
      // alert(`You chose "${id}"`)
    }
  }

  const handletimeChange = (event: React.SyntheticEvent | null, newtime: string | null) => {
    if (newtime != null && newtime == 'Enter') {
      const currentTime = new Date().toLocaleTimeString()
      setnowTime(currentTime)
      setStatus(newtime)
      console.log(status)
    } else if (newtime != null && newtime == 'Exit') {
      const currentTime = new Date().toLocaleTimeString()
      setnowTime(currentTime)
      setStatus(newtime)
      console.log(status)
    } else if (newtime != null && newtime == 'Vacant') {
      // const currentTime = new Date().toLocaleTimeString()
      // setnowTime(currentTime)
      setStatus(newtime)
    } else if (newtime != null && newtime == 'ComeBack') {
      // const currentTime = new Date().toLocaleTimeString()
      // setnowTime(currentTime)
      setStatus(newtime)
    }
  }

  const handlechangePerson = () => {
    const updatedPeople = people.map((people) => {
      if (people.id === id) {
        if (status == 'Enter') {
          if (people.Present == '自宅') {
            return {
              ...people,
              Date: date,
              intime: nowTime,
              Present: 'ー在室ー',
            }
          } else {
            alert(`You can't chose "${status}"!  You should choose "Exit" or "vacant"`)
          }
        } else if (status == 'Exit') {
          if (people.Present == 'ー在室ー') {
            return {
              ...people,
              outtime: nowTime,
              Present: '自宅',
            }
          } else {
            alert(`You can't chose "${status}"!  You should choose "Enter" or "ComeBack"`)
          }
        } else if (status == 'Vacant') {
          if (people.Present == 'ー在室ー') {
            return {
              ...people,
              Present: 'ー外出ー',
            }
          } else {
            alert(`You can't chose "${status}"!  You should choose "Enter"`)
          }
        } else if (status == 'ComeBack') {
          if (people.Present == 'ー外出ー') {
            return {
              ...people,
              Present: 'ー在室ー',
            }
          } else {
            alert(`You can't chose "${status}"!`)
          }
        }
      }
      return people
    })

    setPeople(updatedPeople)
  }

  const styles = () => ({
    dropdownStyle: {
      maxHeight: 300,
    },
  })

  return (
    <div>
      <div className='content'>
        {/* calndar inputbox in content */}
        <div className='calendar'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
              <DemoItem>
                <DateCalendar value={value} onChange={setini} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className='inputbox'>
          {/* information inputbutton in inputbox */}
          <div className='information'>
            <Select
              className='number'
              placeholder='Student Number'
              defaultValue='0000000'
              onChange={handleidChange}
            >
              <Option value='4620007'>4620007</Option>
              <Option value='4620010'>4620010</Option>
              <Option value='4620013'>4620013</Option>
              <Option value='4620017'>4620017</Option>
              <Option value='4620030'>4620030</Option>
              <Option value='4620087'>4620087</Option>
              <Option value='4620094'>4620094</Option>
              <Option value='4620095'>4620095</Option>
              <Option value='4620098'>4620098</Option>
            </Select>

            <Select
              className='status'
              placeholder='Enter,Exit,Vacant'
              defaultValue='入室'
              onChange={handletimeChange}
            >
              <Option value='Enter'>Enter</Option>
              <Option value='Exit'>Exit</Option>
              <Option value='Vacant'>Vacant</Option>
              <Option value='ComeBack'>ComeBack</Option>
            </Select>

            <Typography startDecorator={<Time />}>時刻: {nowTime}</Typography>
          </div>

          <div className='changebutton'>
            <Button onClick={handlechangePerson}>確定</Button>
          </div>
        </div>
      </div>

      <div className='table'>
        <div className='resetbutton'>
          <Button onClick={table_reset}>表を初期化</Button>
        </div>

        <div className=''>
          <Button onClick={table_reset}>DBへ送信</Button>
        </div>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={people}
            columns={columns}
            z-index='0'
            slots={{
              baseSelect: Select,
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 5, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  )
}

export default App
