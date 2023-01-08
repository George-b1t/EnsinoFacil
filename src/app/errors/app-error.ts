import { HttpStatus, HttpException } from "@nestjs/common";

export class AppError extends HttpException {
  constructor(message: string) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error: "Bad request"
    }, HttpStatus.BAD_REQUEST);
  }
}