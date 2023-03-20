export interface APIResponse<T> {
    httpStatusCode: number,
    isSuccess: boolean,
    messages: string[],
    data: T
  }