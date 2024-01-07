import { StatusCodeEnum } from "./status-code"

export default abstract class Next<T> {
    protected next?: Next<T>

    setNext(next: Next<T>) {
        this.next = next
    }

    abstract handle(response: T): {
        statusCode: StatusCodeEnum,
        data: T | { message: string }
    } | void
}

class NoContent<T> extends Next<T> {
    constructor(
        private readonly customNoContentMessage?: string 
    ) { super() }

    handle(response: T): { statusCode: StatusCodeEnum; data: { message: string } | T } | void {
        if(!response) {
            const message = this.customNoContentMessage || 'request execute with success'
            return {
                statusCode: StatusCodeEnum.NoContent,
                data: { message }
            }
        }

        this.next?.handle(response)
    }
}

class Ok<T> extends Next<T> {
    handle(response: T): { statusCode: StatusCodeEnum; data: { message: string } | T } {
        return {
            statusCode: StatusCodeEnum.OK,
            data: response
        }
    }
}

export class SuccessApiChain<T> {
    constructor(private readonly options: {
        messageUndefinedResponse?: string
    }) {}

    handle(response: T): { statusCode: StatusCodeEnum; data: { message: string } | T } {
       const noContent = new NoContent<T>(this.options.messageUndefinedResponse)
       const ok = new Ok<T>()

       noContent.setNext(ok)

       const httpResponse = noContent.handle(response)

       if(!httpResponse) { return { data: { message: 'Internal server Error' }, statusCode: 500 }}

       return {
            data: httpResponse.data,
            statusCode: httpResponse.statusCode
       }
    }
}
