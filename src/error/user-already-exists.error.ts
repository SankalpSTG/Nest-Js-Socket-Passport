import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsError extends HttpException {
    constructor(){
        super(
            'User Already Exists',
            HttpStatus.BAD_REQUEST
        )
    }
}