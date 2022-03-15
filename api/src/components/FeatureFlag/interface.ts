import { IFeatureFlagModel } from './model';

/**
 * @export
 * @interface IFeatureFlagService
 */
export interface IFeatureFlagService {

    /**
     * @returns {Promise<IFeatureFlagModel[]>}
     * @memberof IFeatureFlagService
     */
    findAll(apiKey: string): Promise<IFeatureFlagModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IFeatureFlagModel>}
     * @memberof IFeatureFlagService
     */
    findOne(code: string): Promise<IFeatureFlagModel>;

    /**
     * @param {IFeatureFlagModel} IFeatureFlagModel
     * @returns {Promise<IFeatureFlagModel>}
     * @memberof IFeatureFlagService
     */
    insert(IFeatureFlagModel: IFeatureFlagModel): Promise<IFeatureFlagModel>;
    
    /**
     * @param {string} id
     * @param {IFeatureFlagModel} IFeatureFlagModel
     * @returns {Promise<IFeatureFlagModel>}
     * @memberof IFeatureFlagService
     */
    update(id: string, IFeatureFlagModel: IFeatureFlagModel, apiKey: string): Promise<IFeatureFlagModel>;

    /**
     * @param {string} id
     * @returns {Promise<IFeatureFlagModel>}
     * @memberof IFeatureFlagService
     */
    remove(id: string): Promise<IFeatureFlagModel>;
}
