// src/App.tsx
import { useState, ChangeEvent, FormEvent } from 'react'
import styled from '@emotion/styled'

type TodoItem = {
  id: number
  text: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
`

const Button = styled.button`
  margin-left: 8px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  cursor: pointer;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 4px 0;
`

const Checkbox = styled.input`
  margin-right: 8px;
`

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue.trim()) {
      setTodos([...todos, { id: new Date().getTime(), text: inputValue }])
      setInputValue('')
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const moveToCompletedList = (id: number) => {
    const item = todos.find((todo) => todo.id === id)
    if (item) {
      setTodos(todos.filter((todo) => todo.id !== id))
      setCompletedTodos([...completedTodos, item])
    }
  }

  return (
    <Container>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          value={inputValue}
          onChange={handleChange}
          placeholder='Add a new todo item'
        />
        <Button type='submit'>Add</Button>
      </form>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              type='checkbox'
              onChange={() => moveToCompletedList(todo.id)}
            />
            {todo.text}
            <Button onClick={() => moveToCompletedList(todo.id)}>
              No Thank You
            </Button>
          </ListItem>
        ))}
      </List>
      <h2>Completed List</h2>
      <List>
        {completedTodos.map((item) => (
          <ListItem key={item.id}>
            <Checkbox type='checkbox' checked disabled />
            {item.text}
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default App
