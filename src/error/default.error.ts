import { HttpException, HttpStatus } from "@nestjs/common";

export class DefaultError extends HttpException {
    constructor(){
        super(
            'An Error Occured',
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
}