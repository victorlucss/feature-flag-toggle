import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

export interface GenericFF {
    [key: string]: any;
}

/**
 * @export
 * @interface IFeatureFlagModel
 * @extends {Document}
 */
export interface IFeatureFlagModel extends Document {
    name: string;
    key: string;
    value: GenericFF;
    enabled: boolean;
    apiKey: string;
}

const FeatureFlagSchema: Schema = new Schema({
    key: {
        type: String,
        unique: true,
        trim: true
    },
    name: String,
    enabled: Boolean,
    value: String,
    apiKey: String,
}, {
    collection: 'featureflagmodel',
    versionKey: false
});

export default connections.db.model <IFeatureFlagModel> ('FeatureFlagModel', FeatureFlagSchema);
