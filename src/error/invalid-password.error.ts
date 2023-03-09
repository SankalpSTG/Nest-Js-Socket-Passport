import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialsError extends HttpException {
    constructor(){
        super(
            'Invalid email and password combination',
            HttpStatus.BAD_REQUEST
        )
    }
}