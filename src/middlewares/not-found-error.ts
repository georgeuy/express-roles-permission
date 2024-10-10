import { CustomError } from "@errors/custom-error";

export class NotFoundError extends CustomError{

    status = 404;

    constructor() {
        super('Ruta no encontrada')

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(){
        return [{ message: 'Página no encontrada' }];
    }

}