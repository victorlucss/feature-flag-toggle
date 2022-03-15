import { IApiKeyModel } from './model';


export interface IApiKeyService {
    findOne(code: string): Promise<IApiKeyModel>;

    insert(): Promise<IApiKeyModel>;

    remove(id: string): Promise<IApiKeyModel>;
}
