import { Controller, Body, Post } from '@nestjs/common'

import { TodoSuggestionRequest, TodoSuggestionResponse } from '@gpt-todo/dtos'

import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(readonly todoService: TodoService) {}

  @Post()
  produceTodoList(
    @Body() todoRequest: TodoSuggestionRequest,
  ): Promise<TodoSuggestionResponse> {
    return this.todoService.produceTodoList(todoRequest)
  }
}
