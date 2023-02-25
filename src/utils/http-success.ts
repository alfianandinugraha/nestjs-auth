export class HttpSuccess {
  constructor(
    public readonly message: string,
    public readonly data?: any,
    public readonly statusCode = 200,
  ) {}

  static ok(message: string, data: any = null) {
    return new HttpSuccess(message, data, 200);
  }

  static created(message: string, data: any = null) {
    return new HttpSuccess(message, data, 201);
  }
}
