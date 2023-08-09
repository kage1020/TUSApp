'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'

import AssignmentIcon from '@mui/icons-material/Assignment'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import Checkbox from '@mui/joy/Checkbox'
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemContent from '@mui/joy/ListItemContent'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import Sheet from '@mui/joy/Sheet'
import Stack from '@mui/joy/Stack'
import Textarea from '@mui/joy/Textarea'
import Tooltip from '@mui/joy/Tooltip'
import Typography from '@mui/joy/Typography'
import axios from 'axios'
import useSWR from 'swr'

import Skeleton from '@/components/Skeleton'

import type { AxiosError } from 'axios'

type TodoItem = {
  id: string
  text: string
  completed: boolean
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function TodoPage() {
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')
  const [serverError, setServerError] = useState('')
  const { data: tasks, mutate } = useSWR<TodoItem[]>('/api/task', fetcher, {
    onError: (err: AxiosError<TodoItem[]>) =>
      setServerError(err.response?.statusText || 'エラーが発生しました'),
  })

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    setInputError('')
  }

  const addTodo = async () => {
    if (input.trim() === '') setInputError('タスク名を入力してください')
    else {
      axios.post('/api/task', { text: input.trim() }).catch(() => {
        setServerError('エラーが発生しました')
      })
      setInput('')
      const data = [...(tasks ?? []), { id: '1', text: input.trim(), completed: false }]
      mutate(data, { optimisticData: data, populateCache: true, revalidate: false })
    }
  }

  const toggleTask = async (id: string) => {
    axios.post(`/api/task/${id}`).catch(() => {
      setServerError('エラーが発生しました')
    })
    const data = tasks?.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    )
    mutate(data, { optimisticData: data, populateCache: true, revalidate: false })
  }

  const deleteTask = async (id: string) => {
    axios.delete(`/api/task/${id}`).catch(() => {
      setServerError('エラーが発生しました')
    })
    const data = tasks?.filter((task) => task.id !== id)
    mutate(data, { optimisticData: data, populateCache: true, revalidate: false })
  }

  return (
    <Card sx={{ width: '100%', maxWidth: '1080px' }} variant='outlined' size='lg'>
      <Typography sx={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 700 }}>
        ToDo List
      </Typography>
      <Sheet sx={{ pt: '2rem' }}>
        <Stack sx={{ alignItems: 'center' }} spacing={2} direction='row'>
          <Sheet sx={{ flexGrow: 1 }}>
            <Textarea
              color='primary'
              value={input}
              placeholder='DO TASK'
              onChange={handleInput}
              disabled={serverError !== ''}
            />
            {inputError !== '' && <Typography color='danger'>{inputError}</Typography>}
          </Sheet>
          <Button onClick={addTodo} disabled={serverError !== ''}>
            追加
          </Button>
        </Stack>
        <Stack sx={{ pt: '2rem' }} spacing={2}>
          {!tasks && !serverError && <Skeleton />}
          {serverError && <Typography color='danger'>{serverError}</Typography>}
          {tasks?.length === 0 && !serverError && <Typography>タスクがありません</Typography>}
          <List>
            {!serverError &&
              tasks?.map((task) => (
                <ListItem
                  key={task.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#00000010',
                    },
                  }}
                  endAction={
                    <>
                      <Tooltip
                        sx={{ alignItems: 'center' }}
                        title={task.completed ? '未完了にする' : '完了にする'}
                      >
                        <Checkbox
                          color='primary'
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                      </Tooltip>
                      <Tooltip title='削除'>
                        <IconButton onClick={() => deleteTask(task.id)}>
                          <DeleteIcon color='error' />
                        </IconButton>
                      </Tooltip>
                    </>
                  }
                >
                  <ListItemDecorator>
                    {task.completed ? (
                      <AssignmentTurnedInIcon color='success' />
                    ) : (
                      <AssignmentIcon />
                    )}
                  </ListItemDecorator>
                  <ListItemContent
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      wordBreak: 'break-all',
                      display: 'grid',
                    }}
                  >
                    {task.text.split('\n').map((text, i) => (
                      <Typography sx={{ height: '24px' }} key={i}>
                        {text}
                      </Typography>
                    ))}
                  </ListItemContent>
                </ListItem>
              ))}
          </List>
        </Stack>
      </Sheet>
    </Card>
  )
}
