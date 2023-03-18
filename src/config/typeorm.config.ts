import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/task/entities';
import {User} from "../user/entities/user.entity"
const port: number = parseInt(<string>process.env.PORT) || 3306;

export const typeormConnectionConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: "<<HOST>>",
  port: 3306,
  username: "<<USERNAME>>",
  password: "<<PASSWORD>>",
  database: "<<DATABASENAME>>",
  entities: [User, Task],
  synchronize: false,
};
