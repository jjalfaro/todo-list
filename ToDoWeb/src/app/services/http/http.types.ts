export interface APIResponse<T> {
    httpStatusCode: number,
    isSuccess: boolean,
    messages: string[],
    data: T
}
export enum MessageType {
  Info,
  Success,
  Warning,
  Error
}

export interface Message {
  type: MessageType,
  text: string
}