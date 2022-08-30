import { v4, validate, version } from 'uuid';
import { Formatter } from '../../utils/index.js';

export class ESRepository {

    constructor(client) {
        this.client = client;
    }

    async IndexProduct(product) {
        await this.client.index({
            index: 'hadiya_products',
            document: {
                id: v4(),
                name: product.name,
                price: product.price,
                currency: product.currency,
                createdAt: Formatter.formatDate2Timestamp(new Date()),
                updatedAt: Formatter.formatDate2Timestamp(new Date())
            }
        })
    }

}