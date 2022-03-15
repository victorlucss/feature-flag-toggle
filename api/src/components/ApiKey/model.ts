import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

export interface IApiKeyModel extends Document {
    api_key: string;
}

const ApiKeySchema: Schema = new Schema({
    api_key: {
        type: String,
        unique: true,
        trim: true
    },
}, {
    collection: 'apikeymodel',
    versionKey: false
});

export default connections.db.model <IApiKeyModel> ('ApiKeyModel', ApiKeySchema);
