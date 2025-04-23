export class UnSecureContext extends Error {
    constructor() {
        super(`clipboard cannot be accessed in unsecure context!`)
    }
}