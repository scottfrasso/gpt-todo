import { useState, ChangeEvent, FormEvent } from 'react'
import CssLoader from './CssLoader'
import toast, { Toaster } from 'react-hot-toast'
import { TextField } from '@mui/material'

import * as uuid from 'uuid'

import { TodoSuggestionResponse } from '@gpt-todo/dtos'

import { Button, Checkbox, Container, List, ListItem, RedText } from './style'
import { TodoItem } from './types'

// Override the base URL if we are running in development mode
const baseURL =
  import.meta.env.VITE_API_BASE_URL || 'https://api-2qnlzue5bq-uc.a.run.app'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [previousInputValue, setPreviousInputValue] = useState('')
  const [sarcasticResponse, setSarcasticResponse] = useState<
    string | undefined
  >(undefined)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const usersInput = inputValue.trim()

    event.preventDefault()
    if (!usersInput) {
      toast.error('Try writing something in the input field first!')
      return
    }

    if (usersInput === previousInputValue) {
      toast.error('You already asked me to do that! And I gave you an answer!')
      return
    }

    const postData = { text: usersInput }

    const fetchData = async () => {
      let todoResults: TodoSuggestionResponse | undefined
      try {
        const response = await fetch(`${baseURL}/todo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })

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
        setSarcasticResponse(
          todoResults.sarcasticResponse ||
            'Sorry, I cant help you with that. Maybe try a therapist',
        )
      } else {
        setSarcasticResponse(undefined)
      }

      const resultingTodoList = todoResults.suggestions.map((suggestion) => ({
        id: uuid.v4(),
        text: suggestion,
      }))

      setTodos(resultingTodoList)
    }

    setSarcasticResponse(undefined)
    setIsLoading(true)
    fetchData()
      .catch((error) => console.error(error))
      .finally(() => {
        setPreviousInputValue(usersInput)
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

  const hasAnyTodos = todos.length > 0 || completedTodos.length > 0
  const hasAnyInputValue = inputValue.length === 0
  const sameInputValue = inputValue === previousInputValue

  return (
    <Container>
      <Toaster />
      <h1>To do List Generator</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant='outlined'
          value={inputValue}
          onChange={handleChange}
          placeholder='Build a model airplane'
          disabled={isLoading}
        />
        <Button
          type='submit'
          disabled={hasAnyInputValue || isLoading || sameInputValue}
        >
          Make my to do list
        </Button>
      </form>
      {isLoading && <CssLoader size={80} color='#61dafb' />}
      {sarcasticResponse && <RedText>{sarcasticResponse}</RedText>}
      {hasAnyTodos && (
        <>
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
                  style={{ fontSize: '12px', padding: '2.5px' }}
                  disabled={isLoading}
                >
                  X
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
