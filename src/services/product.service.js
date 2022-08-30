import { ProductRepository } from '../database/index.js'
import { QueueService } from './queue.service.js';
import { API400Error } from '../utils/errors/index.js';

export const Events = {
    ADD_TO_CART: 'ADD_PRODUCT_TO_CART'
}

export class ProductService {

    constructor(producer) {
        this.queueService = new QueueService(producer);
        this.repository = new ProductRepository();
    }

    async AddProduct (productData) {
        if(!productData){
            throw new API400Error('Request missing product data!')
        }
        const { name, price, currency } = productData;
        if(!name || !price || !currency){
            //handle
            throw new API400Error('Required fields in product data missing!');
        }
        await this.repository.insertProduct({ name, price, currency });
    }

    async GetProducts (pagination) {
        return await this.repository.fetchAllProducts(pagination);
    }

    async GetProductById (id) {
        if(!id){
            // handle
            throw new API400Error('Request is missing product ID!');
        }
        return await this.repository.fetchProductById(id);
    }

    async UpdateProduct(productData){
        if(!productData){
            throw new API400Error('Request missing product data!')
        }
        await this.repository.updateProduct(productData);
    }

    async DeleteProduct(id){
        if(!id){
            throw new API400Error('Request is missing product ID!');
        }
        await this.repository.removeProduct(id);
    }

    async AddToCart (data) {
        if(!data){
            //handle
            throw new API400Error('Request is missing data!');
        }
        const payload = {
            event: Events.ADD_TO_CART,
            data: data
        }
        await this.queueService.SendMessage(payload);
    }

}