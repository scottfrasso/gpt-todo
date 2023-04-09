import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  health(): string {
    return 'OK'
  }
}
