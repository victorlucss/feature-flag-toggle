"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const mongoose_1 = require("mongoose");
/**
 * @export
 * @class Validation
 */
class Validation {
    /**
     * Creates an instance of Schema.
     * @memberof JoiSchema
     */
    constructor() {
        /**
         * @static
         * @type {string}
         * @memberof JoiSchema
         */
        this.messageObjectId = 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
        this.customJoi = Joi.extend((joi) => ({
            type: 'objectId',
            base: joi.string(),
            validate(value, helpers) {
                if (!mongoose_1.Types.ObjectId.isValid(value)) {
                    return this.createError('objectId.base', {
                        value
                    }, helpers);
                }
                return value; // Keep the value as it was
            }
        }));
    }
}
exports.default = Validation;
//# sourceMappingURL=validation.js.map