import FeatureFlagModel, { IFeatureFlagModel } from './model';
import { IFeatureFlagService } from './interface';
import { Types } from 'mongoose';
import { socketIO } from '../../config/socket';

/**
 * @export
 * @implements {IFeatureFlagModelService}
 */
const FeatureFlagService: IFeatureFlagService = {
    /**
     * @returns {Promise < IFeatureFlagMode[]>}
     * @memberof FeatureFlagService
     */
    async findAll(apiKey: string): Promise<IFeatureFlagModel[]> {
        try {
            return await FeatureFlagModel.find({
                apiKey
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise <IFeatureFlagModel>}
     * @memberof FeatureFlagService
     */
    async findOne(id: string): Promise<IFeatureFlagModel> {
        try {
            return await FeatureFlagModel.findOne({
                _id: new Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IFeatureFlagModel} featureFlag
     * @returns {Promise <IFeatureFlagModel>}
     * @memberof FeatureFlagService
     */
    async insert(body: IFeatureFlagModel): Promise<IFeatureFlagModel> {
        try {
            const featureFlag: IFeatureFlagModel = await FeatureFlagModel.create(body);

            socketIO.emit('new_ff', featureFlag);
            return featureFlag;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise <IFeatureFlagModel>}
     * @memberof FeatureFlagService
     */
    async remove(id: string): Promise<IFeatureFlagModel> {
        try {
            const featureFlag: IFeatureFlagModel = await FeatureFlagModel.findOneAndRemove({
                _id: new Types.ObjectId(id)
            });

            socketIO.emit('del_ff', id);

            return featureFlag;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id: string, update: IFeatureFlagModel, apiKey: string): Promise<IFeatureFlagModel> {
        try {
            await FeatureFlagModel.findOneAndUpdate({
                id
            }, update)

            const found = await FeatureFlagModel.findOne({ id })
            console.log('updating', `/ff-${apiKey}`)
            socketIO.of(`/ff-${apiKey}`).emit('update_ff', found);
    
    
            return found;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default FeatureFlagService;
