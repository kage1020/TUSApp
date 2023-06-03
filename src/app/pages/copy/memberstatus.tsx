'use client'
import { useState } from 'react'
import * as React from 'react'

import Time from '@mui/icons-material/Schedule'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import Typography from '@mui/joy/Typography'
import Alert from '@mui/material/Alert'
import { DataGrid } from '@mui/x-data-grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios'
import dayjs from 'dayjs'
import useSWR from 'swr'

import Button from '@/components/button'

import type Person from '@mui/icons-material/Person'
import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import type { Dayjs } from 'dayjs'

const columns: GridColDef[] = [
  { field: 'id', headerName: '学籍番号', width: 150 },
  { field: 'Name', headerName: '名前', width: 130 },
  { field: 'Date', headerName: '日付', width: 130 },
  { field: 'EnterTime', headerName: '入室時間', width: 130 },
  { field: 'ExitTime', headerName: '退室時間', width: 130 },
  { field: 'Status', headerName: '在室状況', width: 160 },
]

//field名と変数名は一致させる必要あり
interface Person {
  id: number
  Name: string
  Date: string
  EnterTime: string
  ExitTime: string
  Status: string
}
const ta_people: Person[] = [
  { id: 4620007, Name: '井上 璃久', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620010, Name: '岩尾 優和', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620013, Name: '石見 椋', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620017, Name: '大田原 秀人', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620030, Name: '片桐 卓巳', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620087, Name: '平井 悠喜', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620094, Name: '丸山 恭弘', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620095, Name: '三橋 薫乃', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
  { id: 4620098, Name: '目黒 圭峻', Date: '', EnterTime: '', ExitTime: '', Status: '自宅' },
]

const MemberState = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [nowTime, setnowTime] = useState('')
  const [enterTime, setenterTime] = useState('')
  const [exitTime, setexitTime] = useState('')
  // const [persons, setPersons] = useState<Person[]>([])
  const [date, setDate] = useState('')
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-05-01'))

  const [inputError, setInputError] = useState('')
  const [serverError, setServerError] = useState('')
  const { data: people, mutate } = useSWR<Person[]>(
    '/api/db',

    (url) => axios.get(url).then((res) => res.data),
    { onError: (err) => setServerError(err.message) },
  )

  const handledateChange = (newDate: Dayjs | null) => {
    if (newDate != null) {
      setValue(newDate)
      setDate(newDate.format('YYYY-MM-DD'))
    }
  }
  //id Name set
  const handleidChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue != null) {
      setId(newValue)
      ta_people.map((person) => {
        if (person.id == parseInt(newValue, 10)) {
          setName(person.Name)
        }
      })
    }
  }
  // currenttime state set
  const handletimeChange = (event: React.SyntheticEvent | null, newstate: string | null) => {
    if (newstate != null && newstate == 'Enter') {
      const currentTime = new Date().toLocaleTimeString()
      setnowTime(currentTime)
      setenterTime(currentTime)
      setStatus(newstate)
    } else if (newstate != null && newstate == 'Exit') {
      const currentTime = new Date().toLocaleTimeString()
      setnowTime(currentTime)
      setexitTime(currentTime)
      setStatus(newstate)
    } else if (newstate != null && newstate == 'Vacant') {
      setStatus(newstate)
    } else if (newstate != null && newstate == 'ComeBack') {
      setStatus(newstate)
    }
  }

  const addstatus = async () => {
    console.log(serverError)
    //３つのhandolechangeに対応
    if (date == '') {
      setInputError('Dateを選択してください。')
      alert(inputError)
    } else if (id == '') {
      setInputError('student numberを選択してください。')
      alert(inputError)
    } else if (status == '') {
      setInputError('statusを選択してください。')
      alert(inputError)
    } else {
      if (status == 'Enter') {
        //serverに送る
        const res = await axios.post('/api/db', {
          id: id,
          Name: name,
          Date: date,
          EnterTime: enterTime,
          ExitTime: exitTime,
        })
        //client側の表示で使う
        if (res.status === 200 && people) {
          const data = [
            ...people,
            {
              id: res.data.id,
              Name: name,
              Date: date,
              EnterTime: enterTime,
              ExitTime: exitTime,
              Status: status,
            },
          ]
          mutate(data, { optimisticData: data })
        } else setServerError('エラーが発生しました')
      }
      //Exitの場合はidが一致する箇所を変更
      // else if (status == 'Exit') {
      //   const res = await axios.post('/api/db', {
      //     outtime: outTime,
      //     Present: status,
      //   })
      //   if (res.status === 200 && people) {
      //     const data = [...people, { outtime: outTime, Present: status }]
      //     mutate(data, { optimisticData: data })
      //   } else setServerError('エラーが発生しました')
      // }
    }
  }

  return (
    <div>
      <div className='head_display'>
        <div className='calendar'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
              <DemoItem>
                <DateCalendar value={value} onChange={handledateChange} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className='SelectInput'>
          <div className='data_status'>
            <Select
              className='number'
              placeholder='Student Number'
              defaultValue=''
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
              placeholder='Status'
              defaultValue=''
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
            <Button onClick={addstatus}>確定</Button>
          </div>
        </div>
      </div>

      <div>
        {people?.map((person) => (
          <p key={person.id}>あいうえお</p>
          // <p key={person.id}>{person.Status}</p>
        ))}
      </div>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={people || []}
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
  )
}

export default MemberState
