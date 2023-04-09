import { Injectable } from '@nestjs/common'

import { TodoSuggestionRequest, TodoSuggestionResponse } from '@gpt-todo/dtos'

@Injectable()
export class TodoService {
  async produceTodoList(
    todoRequest: TodoSuggestionRequest,
  ): Promise<TodoSuggestionResponse> {
    return {
      text: todoRequest.text,
      suggestions: ['foo', 'bar'],
    }
  }
}
