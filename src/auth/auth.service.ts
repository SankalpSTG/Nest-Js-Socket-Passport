import { Injectable } from '@nestjs/common';
import { RequestLogin, RequestSignUp } from './interfaces';
import { UserService } from '../user';
import { DefaultError, UserAlreadyExistsError } from '../error';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsError } from 'src/error/invalid-password.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService
  ) {}

  public async signUp(data: RequestSignUp) {
    
    let user = await this.usersService.getUser(data.email)
    if(user != null){
      throw new UserAlreadyExistsError
    }

    user = await this.usersService.createUser(data);
  }

  public async login(user: any): Promise<any> {
    return {
      ...user,
      access_token: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }

  public async validateUser(data: RequestLogin): Promise<any> {
    const user = await this.usersService.getUser(data.email);

    if(user === null){
      throw new InvalidCredentialsError
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if(!passwordMatch){
      throw new InvalidCredentialsError
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
