import { useState, ChangeEvent, FormEvent } from 'react'
import CssLoader from './CssLoader'
import toast from 'react-hot-toast'

import * as uuid from 'uuid'

import { TodoSuggestionResponse } from '@gpt-todo/dtos'

import { Button, Checkbox, Container, Input, List, ListItem } from './style'
import { TodoItem } from './types'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputValue.trim()) {
      toast.error('Try writing something in the input field first!')
    }

    const postData = { text: inputValue.trim() }

    const fetchData = async () => {
      let todoResults: TodoSuggestionResponse | undefined
      try {
        //https://api-2qnlzue5bq-uc.a.run.app/todo
        //http://localhost:3000/todo
        const response = await fetch(
          'https://api-2qnlzue5bq-uc.a.run.app/todo',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          },
        )

        if (!response.ok) {
          toast.error('Something went wrong, sorry I cant help right now.')
          throw new Error(`Failed to create todo item: ${response.status}`)
        }

        todoResults = (await response.json()) as TodoSuggestionResponse
      } catch (error) {
        toast.error(
          'Something went wrong, sorry I cant help right now. Your request might have been innapropriate.',
        )
        console.error(error)
        return
      }

      if (!todoResults) {
        toast.error('Something went wrong, sorry I cant help right now.')
        return
      }

      if (todoResults.inappropriate) {
        toast.error('Sorry, I cant help you with that. Maybe try a therapist')
        return
      }

      const resultingTodoList = todoResults.suggestions.map((suggestion) => ({
        id: uuid.v4(),
        text: suggestion,
      }))

      setTodos(resultingTodoList)
      setInputValue('')
    }

    setIsLoading(true)
    fetchData()
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const moveToCompletedList = (id: string) => {
    const item = todos.find((todo) => todo.id === id)
    if (item) {
      setTodos(todos.filter((todo) => todo.id !== id))
      setCompletedTodos([...completedTodos, item])
    }
  }

  return (
    <Container>
      <h1>Todo List Generator</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          value={inputValue}
          onChange={handleChange}
          placeholder='Build a model airplane...'
          disabled={isLoading}
        />
        <Button type='submit'>Help me</Button>
      </form>
      {isLoading && <CssLoader size={80} color='#61dafb' />}
      {!isLoading && (
        <>
          <h2>To do</h2>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id}>
                <Checkbox
                  type='checkbox'
                  onChange={() => moveToCompletedList(todo.id)}
                  disabled={isLoading}
                />
                {todo.text}
                <Button
                  onClick={() => moveToCompletedList(todo.id)}
                  disabled={isLoading}
                >
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
        </>
      )}
    </Container>
  )
}

export default App
