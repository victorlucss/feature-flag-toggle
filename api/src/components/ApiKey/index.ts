import ApiKeyService from './service';
import { HttpError } from '../../config/error';
import { IApiKeyModel } from './model';
import { NextFunction, Request, Response } from 'express';

export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const apikey: IApiKeyModel = await ApiKeyService.findOne(req.params.id);

        res.status(200).json(apikey);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const apikey: IApiKeyModel = await ApiKeyService.insert();

        res.status(201).json(apikey);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}