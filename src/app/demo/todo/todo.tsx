'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'

import {
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { signOut } from 'next-auth/react'
import useSWR from 'swr'

import Skelton from '@/components/Skeleton'

import type { AxiosError } from 'axios'

type TodoItem = {
  id: string
  text: string
  completed: boolean
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const Todo = () => {
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')
  const [serverError, setServerError] = useState('')
  const { data: tasks, mutate } = useSWR<TodoItem[]>('/api/task', fetcher, {
    onError: (err: AxiosError<TodoItem[]>) =>
      setServerError(err.response?.statusText || 'エラーが発生しました'),
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setInputError('')
  }

  const addTodo = async () => {
    if (input.trim() === '') setInputError('タスク名を入力してください')
    else {
      const res = await axios.post('/api/task', { text: input.trim() })
      if (res.status === 200 && tasks) {
        setInput('')
        const data = [...tasks, { id: res.data.id, text: input.trim(), completed: false }]
        await mutate(data, { optimisticData: data })
      } else setServerError('エラーが発生しました')
    }
  }

  const toggleTask = async (id: string) => {
    const res = await axios.post(`/api/task/${id}`)
    if (res.status === 200) {
      const data = tasks?.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      )
      await mutate(data, { optimisticData: data })
    } else setServerError('エラーが発生しました')
  }

  const deleteTask = async (id: string) => {
    const res = await axios.delete(`/api/task/${id}`)
    if (res.status === 200) {
      const data = tasks?.filter((task) => task.id !== id)
      await mutate(data, { optimisticData: data })
    } else setServerError('エラーが発生しました')
  }

  return (
    <Card elevation={5}>
      <CardContent sx={{ display: 'grid', rowGap: '1rem' }}>
        <Container>
          <Typography variant='h4'>TODOリスト</Typography>
          <Button onClick={() => signOut()}>sign out</Button>
        </Container>
        <Divider />
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '1rem',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            value={input}
            label='タスク名'
            sx={{ flexGrow: 1 }}
            onChange={handleInput}
            helperText={inputError}
            error={inputError !== ''}
            disabled={serverError !== ''}
            multiline
          />
          <Button variant='contained' onClick={addTodo} disabled={serverError !== ''}>
            追加
          </Button>
        </Container>
        <Divider />
        <Container>
          <List>
            {!tasks && !serverError && <Skelton />}
            {serverError && <Alert severity='error'>{serverError}</Alert>}
            {tasks?.length === 0 && !serverError && <Typography>タスクがありません</Typography>}
            {!serverError &&
              tasks?.map((task) => (
                <ListItem key={task.id} sx={{ pr: '96px' }}>
                  <ListItemIcon>
                    {task.completed ? (
                      <AssignmentTurnedInIcon color='success' />
                    ) : (
                      <AssignmentIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      wordBreak: 'break-all',
                      display: 'grid',
                    }}
                  >
                    {task.text.split('\n').map((text, i) => (
                      <Typography key={i}>{text}</Typography>
                    ))}
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Tooltip title={task.completed ? '未完了にする' : '完了にする'}>
                      <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />
                    </Tooltip>
                    <Tooltip title='削除'>
                      <IconButton onClick={() => deleteTask(task.id)}>
                        <DeleteIcon color='error' />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Container>
      </CardContent>
    </Card>
  )
}

export default Todo
