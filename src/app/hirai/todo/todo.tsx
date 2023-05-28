'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'

import AssignmentIcon from '@mui/icons-material/Assignment'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import DeleteIcon from '@mui/icons-material/Delete'
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
import Typography from '@mui/material/Typography'
import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'

import Skelton from '@/app/components/Skelton'

type TodoItem = {
  id: string
  text: string
  completed: boolean
}

const Todo = () => {
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')
  const [serverError, setServerError] = useState('')
  const { mutate } = useSWRConfig()
  const { data: tasks } = useSWR<TodoItem[]>(
    '/api/task',
    (url) => axios.get(url).then((res) => res.data),
    { onError: (err) => setServerError(err.message) },
  )

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
        mutate('/api/task', data, { optimisticData: data })
      } else setServerError('エラーが発生しました')
    }
  }

  const toggleTask = async (id: string) => {
    const res = await axios.put(`/api/task/${id}`)
    if (res.status === 200) {
      const data = tasks?.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      )
      mutate('/api/task', data, { optimisticData: data })
    } else setServerError('エラーが発生しました')
  }

  const deleteTask = async (id: string) => {
    const res = await axios.delete(`/api/task/${id}`)
    if (res.status === 200) {
      const data = tasks?.filter((task) => task.id !== id)
      mutate('/api/task', data, { optimisticData: data })
    } else setServerError('エラーが発生しました')
  }

  return (
    <Card elevation={5}>
      <CardContent sx={{ display: 'grid', rowGap: '1rem' }}>
        <Container>
          <Typography variant='h4'>TODOリスト</Typography>
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
