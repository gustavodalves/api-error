import { ApiError } from "./api-error";
import { SuccessApiChain } from "./api-process-success";
import { ErrorApiChain} from "./api-process-error";

export abstract class Controller<T, K> {
    private possibleApiErrors: (new () => ApiError)[] = [];

    constructor(
        private readonly options: {
            messageUndefinedResponse?: string,
        }
    ) {}

    protected registerPossibleErrors(error: new () => ApiError) {
        this.possibleApiErrors.push(error);
    }

    protected abstract do(input: K): Promise<T>

    async handle(input: K) {
        try {
            const response = await this.do(input)
            const chain = new SuccessApiChain(this.options)
            return chain.handle(response)
        } catch (err: any) {
            const errorChain = new ErrorApiChain(this.possibleApiErrors)
            return errorChain.handle(err)
        }
    }
}
