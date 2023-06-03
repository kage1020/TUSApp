'use client'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import * as React from 'react'

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import DeleteIcon from '@mui/icons-material/Delete'
import Login from '@mui/icons-material/Login'
import Logout from '@mui/icons-material/Logout'
import Time from '@mui/icons-material/Schedule'
import SentimentSatisfiedAlt from '@mui/icons-material/SentimentSatisfiedAlt'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import Typography from '@mui/joy/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
// import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios'
import dayjs from 'dayjs'
import useSWR from 'swr'

// import Skelton from '@/app/components/Skelton'
import type { Dayjs } from 'dayjs'
type Person = {
  id: string
  Name: string
  Date: string
  EnterTime: string
  ExitTime: string
}
const ta_people: Person[] = [
  { id: '4620007', Name: '井上 璃久', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620010', Name: '岩尾 優和', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620013', Name: '石見 椋', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620017', Name: '大田原 秀人', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620030', Name: '片桐 卓巳', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620087', Name: '平井 悠喜', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620094', Name: '丸山 恭弘', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620095', Name: '三橋 薫乃', Date: '', EnterTime: '', ExitTime: '' },
  { id: '4620098', Name: '目黒 圭峻', Date: '', EnterTime: '', ExitTime: '' },
]
const TimeManagement = () => {
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [nowTime, setnowTime] = useState('')
  const [enterTime, setenterTime] = useState('')
  const [exitTime, setexitTime] = useState('')
  const [sdate, setSdate] = useState('')
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2023-06-01'))

  const [serverError, setServerError] = useState('')
  const { data: people, mutate } = useSWR<Person[]>(
    '/api/time',
    (url) => axios.get(url).then((res) => res.data),
    { onError: (err) => setServerError(err.message) },
  )

  const handledateChange = (newDate: Dayjs | null) => {
    if (newDate != null) {
      setSdate(newDate.format('YYYY-MM-DD'))
      setDate(newDate)
    }
  }

  const handleidChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    if (newValue != null) {
      setId(newValue)
      ta_people.map((person) => {
        if (person.id == newValue) {
          setName(person.Name)
        }
      })
    }
  }

  const handletimeChange = (event: React.SyntheticEvent | null, newstate: string | null) => {
    if (newstate != null && newstate == 'Enter') {
      const currentTime = new Date().toLocaleTimeString()
      setnowTime(currentTime)
      setenterTime(currentTime)
    } else if (newstate != null && newstate == 'Exit') {
      const currentTime = new Date().toLocaleTimeString()
      setnowTime(currentTime)
      setexitTime(currentTime)
    }
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setInputError('')
  }

  const addstatus = async () => {
    console.log(serverError)
    //３つのhandolechangeに対応
    if (sdate == '') {
      setInputError('Dateを選択してください。')
      alert(inputError)
    } else if (id == '') {
      setInputError('student numberを選択してください。')
      alert(inputError)
    } else if (enterTime == '' && exitTime == '') {
      setInputError('"Enter of Exit"を選択してください。')
      alert(inputError)
    } else {
      if (enterTime === nowTime) {
        //serverに送る
        const res = await axios.post('/api/time', {
          id: id,
          Name: name,
          Date: sdate,
          EnterTime: enterTime,
          // ExitTime: exitTime,
        })
        if (res.status === 200 && people) {
          const data = [
            ...people,
            {
              id: res.data.id,
              Name: name,
              Date: sdate,
              EnterTime: enterTime,
              ExitTime: exitTime,
            },
          ]
          mutate(data, { optimisticData: data })
        } else setServerError('エラーが発生しました')
      } else if (exitTime === nowTime) {
        const res = await axios.put(`/api/time/${id}`)
        if (res.status === 200 && people) {
          const data = people.map((person) =>
            person.id === id ? { ...person, ExitTime: exitTime } : person,
          )
          mutate(data, { optimisticData: data })
        }
      }
    }
  }

  // const addTodo = async () => {
  //   if (input.trim() === '') setInputError('タスク名を入力してください')
  //   else {
  //     const res = await axios.post('/api/task', { text: input.trim() })
  //     if (res.status === 200 && tasks) {
  //       setInput('')
  //       const data = [...tasks, { id: res.data.id, text: input.trim(), completed: false }]
  //       mutate(data, { optimisticData: data })
  //     } else setServerError('エラーが発生しました')
  //   }
  // }

  // const toggleTask = async (id: string) => {
  //   const res = await axios.put(`/api/task/${id}`)
  //   if (res.status === 200) {
  //     const data = tasks?.map((task) =>
  //       task.id === id ? { ...task, completed: !task.completed } : task,
  //     )
  //     mutate(data, { optimisticData: data })
  //   } else setServerError('エラーが発生しました')
  // }

  // const deleteTask = async (id: string) => {
  //   const res = await axios.delete(`/api/task/${id}`)
  //   if (res.status === 200) {
  //     const data = tasks?.filter((task) => task.id !== id)
  //     mutate(data, { optimisticData: data })
  //   } else setServerError('エラーが発生しました')
  // }

  return (
    <div>
      <div className='head_display'>
        <div className='calendar'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
              <DemoItem>
                <DateCalendar value={date} onChange={handledateChange} />
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
              placeholder='Enter or Exit'
              defaultValue=''
              onChange={handletimeChange}
            >
              <Option value='Enter'>Enter</Option>
              <Option value='Exit'>Exit</Option>
            </Select>
            <Typography startDecorator={<Time />}>時刻: {nowTime}</Typography>
          </div>
          <div className='changebutton'>
            <Button onClick={addstatus}>確定</Button>
          </div>
        </div>
      </div>

      <Container>
        <List>
          {!people && !serverError && <Typography>スケルトン表示したい</Typography>}
          {serverError && <Alert severity='error'>{serverError}</Alert>}
          {people?.length === 0 && !serverError && <Typography>入室したものはいません</Typography>}
          {!serverError &&
            people?.map((person) => (
              <ListItem key={person.id} sx={{ pr: '96px' }}>
                <ListItemIcon>{person.ExitTime === '' ? <Login /> : <Logout />}</ListItemIcon>
                <ListItemText
                  sx={{
                    textDecoration: person.ExitTime == '' ? 'line-through' : 'none',
                    wordBreak: 'break-all',
                    display: 'grid',
                  }}
                >
                  <Typography>
                    学籍番号：{person.id}
                    名前；{person.Name}
                    <Time />
                    入室時間：
                    {person.EnterTime}
                    退室時間：
                    {person.ExitTime}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
        </List>
      </Container>
    </div>
  )
}

export default TimeManagement
