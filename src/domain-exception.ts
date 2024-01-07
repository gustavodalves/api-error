export abstract class DomainException extends Error {}

export class EmailInvalid extends DomainException {
    constructor() {
        super("invalid email");
    }
}
