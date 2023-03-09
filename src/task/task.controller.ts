import { Request, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService){}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Request() req) {
    return await this.taskService.createTask({user_id: req.user.id, task: req.body.task});
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Request() req) {
    return await this.taskService.getTasks({user_id: req.user.id, page: req.query.page, limit: req.query.limit});
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(@Request() req) {
    return await this.taskService.updateTask({id: req.params.id, task: req.body.task});
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Request() req) {
    return await this.taskService.deleteTask(req.params.id);
  }
}
