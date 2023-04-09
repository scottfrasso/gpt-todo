import { Injectable } from '@nestjs/common'

import { TodoSuggestionRequest, TodoSuggestionResponse } from '@gpt-todo/dtos'
import { getTODOList } from '@gpt-todo/llm'

@Injectable()
export class TodoService {
  async produceTodoList(
    todoRequest: TodoSuggestionRequest,
  ): Promise<TodoSuggestionResponse> {
    const results = await getTODOList(todoRequest.text)

    return {
      ...todoRequest,
      suggestions: [],
      ...results,
    }
  }
}
