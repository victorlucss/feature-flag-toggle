import FeatureFlagService from './service';
import { HttpError } from '../../config/error';
import { IFeatureFlagModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const featureFlags: IFeatureFlagModel[] = await FeatureFlagService.findAll(req.headers['x-api-key'] as string);

        res.status(200).json(featureFlags);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const featureFlag: IFeatureFlagModel = await FeatureFlagService.findOne(req.params.id);

        res.status(200).json(featureFlag);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        req.body.value = JSON.stringify(req.body.value);
        req.body.apiKey = req.headers['x-api-key'] as string;
        const featureFlag: IFeatureFlagModel = await FeatureFlagService.insert(req.body);

        res.status(201).json(featureFlag);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function update(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        if (req.body.value) req.body.value = JSON.stringify(req.body.value);

        const featureFlag: IFeatureFlagModel = await FeatureFlagService.update(req.params.id, req.body, req.headers['x-api-key'] as string);

        res.status(201).json(featureFlag);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const featureFlag: IFeatureFlagModel = await FeatureFlagService.remove(req.params.id);

        res.status(200).json(featureFlag);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
