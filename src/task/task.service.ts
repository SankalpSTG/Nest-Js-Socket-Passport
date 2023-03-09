import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities';
import { Repository } from 'typeorm';
import { RequestCreateTask } from './interfaces/request-create-task.interface';
import { RequestGetTasks } from './interfaces/request-get-tasks.interface';
import { RequestUpdateTask } from './interfaces';
import { DefaultError } from 'src/error';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
    ){}
    
    async createTask(data: RequestCreateTask): Promise<Task>{
        try{
            const task = this.taskRepository.create()
        
            task.user_id = data.user_id
            task.task = data.task
            
            await this.taskRepository.save(task)
            
            return task
        }catch(error){
            throw new DefaultError
        }
    }

    async getTasks(data: RequestGetTasks): Promise<Task[]>{
        try{
            const task = await this.taskRepository.find({where: {user_id: data.user_id}, skip: (data.page - 1) * data.limit, take: data.limit})
            return task
        }catch(error){
            throw new DefaultError
        }
    }

    async updateTask(data: RequestUpdateTask): Promise<Task>{
        try{
            const task = await this.taskRepository.findOneBy({id: data.id})
            task.task = data.task
            
            await this.taskRepository.save(task)
            return task
        }catch(error){
            throw new DefaultError
        }
    }

    async deleteTask(id: number){
        try{
            await this.taskRepository.delete({id})
        }catch(error){
            throw new DefaultError
        }
    }
}
