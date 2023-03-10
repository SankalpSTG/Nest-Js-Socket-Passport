import { Controller, Get, Response } from '@nestjs/common';

@Controller()
export class AppController {
    
    @Get()
    async home(@Response() res) {
      res.json({
        message: "Hello Apostrfy"
      })
    }
}
