import { Request, Response, NextFunction } from "express"
import { CustomError } from "@errors/custom-error";


export const errorHandler = (
    err: Error, 
    req: Request,
    res: Response, 
    next: NextFunction
) =>{

    if (err instanceof CustomError) {
        res.status(err.status).json({ errors: err.serializeErrors() });
    }else{
        // Show error to the admin
        console.error(err);
        
        res.status(400).json({
            errors: [ { message: "Ooops, algo salió mal" } ]
        })
    }

}