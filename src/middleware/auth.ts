import express, { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction):void => {
    try {
        const { TOKEN_SECRET } = process.env;
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, TOKEN_SECRET as Secret)

        next()
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken