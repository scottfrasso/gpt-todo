import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { TodoModule } from './todo/todo.module'

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
