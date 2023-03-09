import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/task/entities';
import {User} from "../user/entities/user.entity"
const port: number = parseInt(<string>process.env.PORT) || 3306;

export const typeormConnectionConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: "34.93.156.51",
  port: 3306,
  username: "sankalp",
  password: "Sankalp@123",
  database: "apostrfy",
  entities: [User, Task],
  synchronize: false,
};