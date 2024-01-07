import { ApiError } from "./api-error";
import { DomainException } from "./domain/@core/shared/domain-exception";
import { StatusCodeEnum } from "./status-code";

abstract class Next {
    protected next?: Next

    setNext(next: Next) {
        this.next = next
    }

    abstract handle(error: Error | ApiError | DomainException): {
        statusCode: StatusCodeEnum,
        message: string
    } | void
}

class CustomDomainErrorToApiError extends Next {
    constructor(
        private possibleApiErrors: (new () => ApiError)[] = []
    ) {
        super()
    }

    handle(err: Error | ApiError): void | { statusCode: StatusCodeEnum; message: string; } {
        const ApiErrorConstructor = this.possibleApiErrors.find(Item => {
            return Item.prototype instanceof err.constructor && err instanceof DomainException
        });
        if (ApiErrorConstructor) {
            const errorInstance = new ApiErrorConstructor();
            return {
                statusCode: errorInstance.statusCode,
                message: errorInstance.message
            };
        }
        this.next?.handle(err)
    }
}

class DefaultDomainErrorToApiError extends Next {
    handle(err: DomainException): void | { statusCode: StatusCodeEnum; message: string; } {
        if(err instanceof DomainException) {
            return {
                statusCode: StatusCodeEnum.BadRequest,
                message: err.message
            }
        }
        this.next?.handle(err)
    }
}

class InternalServer extends Next {
    handle(err: Error): void | { statusCode: StatusCodeEnum; message: string; } {
        return {
            statusCode: StatusCodeEnum.InternalServerError,
            message: err.message
        }
    }
}

export class ErrorApiChain {
    constructor(
        private readonly possibleApiErrors: (new () => ApiError)[] = []
    ) {}

    handle(err: any) {
        const domainCustom = new CustomDomainErrorToApiError(this.possibleApiErrors)
        const domainDefault = new DefaultDomainErrorToApiError()
        const internal = new InternalServer()

        domainCustom.setNext(domainDefault)
        domainDefault.setNext(internal)

        return domainCustom.handle(err)
    }
}
