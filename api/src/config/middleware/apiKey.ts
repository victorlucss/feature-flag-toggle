import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import app from '../server/server';
import HttpError from '../error';
import * as http from 'http';

interface RequestWithUser extends Request {
    api_key: string;
}

export function isValidAPIKey(req: RequestWithUser, res: Response, next: NextFunction): void {
    const token: string = req.headers['x-api-key'] as string;

    if (token) {
        try {
            return next();
        } catch (error) {
            return next(new HttpError(401, http.STATUS_CODES[401]));
        }
    }

    return next(new HttpError(400, 'No APIKey provided'));

}
