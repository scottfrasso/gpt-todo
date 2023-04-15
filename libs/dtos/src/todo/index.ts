export type TodoSuggestionRequest = {
  text: string
}

export type TodoSuggestionResponse = {
  text: string
  suggestions: string[]
  inappropriate: boolean
  sarcasticResponse?: string
}
