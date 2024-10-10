import { CustomError } from "./custom-error";

export class GenericError extends CustomError{

    status:number = 500;

    constructor(message:string, status?:number) {
        super(message)

        if(status) this.status = status; 
        Object.setPrototypeOf(this, GenericError.prototype);
        
    }

    serializeErrors(){
        return [{ message: this.message }];
    }

}