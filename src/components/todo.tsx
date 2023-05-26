import React, { useState } from 'react'

// To-Doアイテムの型定義
interface TodoItem {
  id: number
  text: string
  completed: boolean
}

// To-Doリストコンポーネント
const TodoList: React.FC = () => {
  // useState<型名>(初期値) TodoItemのリスト型、初期値空
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  // 新しいTo-Doアイテムを追加する関数
  const addTodo = () => {
    // 入力が空の場合は処理を終了
    if (newTodoText.trim() === '') {
      return
    }

    // 新しいTo-Doアイテムを作成
    const newTodo: TodoItem = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    }

    // 現在のTo-Doリストに新しいアイテムを追加して状態を更新
    setTodos([...todos, newTodo])
    setNewTodoText('')
  }

  // To-Doアイテムの状態を切り替える関数
  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  // To-Doアイテムをレンダリングする関数
  const renderTodoItems = () => {
    // To-Doアイテムがない場合はメッセージを表示
    if (todos.length === 0) {
      return <p>No to-do items yet.</p>
    }
    // To-Doアイテムをリストとして表示
    return (
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
          >
            <input
              type='checkbox'
              checked={todo.completed}
              // onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    )
  }

  // コンポーネントの描画
  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type='text'
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder='Enter a new to-do item'
      />
      <button onClick={addTodo}>Add</button>

      {renderTodoItems()}
    </div>
  )
}

export default TodoList
