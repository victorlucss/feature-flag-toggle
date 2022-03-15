import ApiKeyModel, { IApiKeyModel } from './model';
import { IApiKeyService } from './interface';
import { Types } from 'mongoose';
import { createHash } from 'crypto';

const ApiKeyService: IApiKeyService = {
    async findOne(api_key: string): Promise <IApiKeyModel> {
        try {
            return await ApiKeyModel.findOne({
                api_key
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async insert(): Promise <IApiKeyModel> {
        try {
            const hash: string = createHash('sha256').update(Math.random().toString()).digest('hex');
            const apikey: IApiKeyModel = await ApiKeyModel.create({
                api_key: `FFT_${hash}`
            });

            return apikey;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async remove(id: string): Promise < IApiKeyModel > {
        try {
            const apikey: IApiKeyModel = await ApiKeyModel.findOneAndRemove({
                _id: new Types.ObjectId(id)
            });

            return apikey;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default ApiKeyService;
