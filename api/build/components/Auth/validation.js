"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends validation_1.default {
    /**
    * Creates an instance of AuthValidation.
    * @memberof AuthValidation
    */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    createUser(params) {
        const schema = Joi.object().keys({
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2
            }).required()
        });
        return schema.validate(params);
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    getUser(params) {
        const schema = Joi.object().keys({
            response_type: Joi.string(),
            state: Joi.string(),
            client_id: Joi.string(),
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2
            }).required()
        });
        return schema.validate(params);
    }
}
exports.default = new AuthValidation();
//# sourceMappingURL=validation.js.map