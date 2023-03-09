import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RequestSignUp } from '../auth/interfaces';
import { DefaultError } from '../error';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    public async createUser (data: RequestSignUp): Promise<User>{
        try{
            const user = this.userRepository.create()
            user.email = data.email
            user.name = data.name
            user.password = await bcrypt.hash(data.password, 8)
            
            await this.userRepository.save(user)
            
            return user
        }catch(error){
            console.log(error)
            throw new DefaultError
        }
    }

    public async getUser (email: string): Promise<any>{
        try{
            const user = await this.userRepository.findOne({where: {email}})
            return user
        }catch(error){
            throw new DefaultError
        }
    }
}
