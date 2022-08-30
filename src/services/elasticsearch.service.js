import { ESRepository } from '../database/repositories/elasticsearch.repository.js';

export class ESService {

    constructor(client) {
        this.repository = new ESRepository(client);
    }

    async AddProduct(product){
        await this.repository.IndexProduct(product);
    }
}