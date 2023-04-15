import { IsString, MinLength } from 'class-validator'

export class TodoSuggestionRequest {
  @MinLength(10)
  @IsString()
  text!: string
}

export type TodoSuggestionResponse = {
  text: string
  suggestions: string[]
  inappropriate: boolean
  sarcasticResponse?: string
}
