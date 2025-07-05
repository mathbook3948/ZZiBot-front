export interface ResponseProps<T> {
    result: boolean
    msg: string | boolean
    content: T | null
}

export type ActionReturnProps<T> = Promise<{
    success: boolean,
    data: ResponseProps<T>
}>