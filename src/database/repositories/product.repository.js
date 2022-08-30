import { v4, validate, version } from 'uuid';
import { API400Error, API404Error } from '../../utils/errors/index.js';
import { Product } from '../models/product.js';

export class ProductRepository {
    async insertProduct (productData) {
        if(!productData){
            // handle
            throw new API400Error(`Request missing product data!`)
        }
        productData.id = v4();
        await Product.create(productData);
    }
      
    async fetchAllProducts (pagination) {
        let limit = 10;
        let offset = 0;
        if(pagination && pagination.limit && pagination.offset){
            limit = pagination.limit;
            offset = pagination.offset;
        }
        const products = await Product.findAll({ offset: offset, limit: limit });
        if(!products || products.length === 0){
            throw new API404Error('Products not found!');
        }
        return products;
    }

    async fetchProductById (id) {
        if(!validate(id) || version(id) !== 4){
            // handle error invalid id
            throw new API400Error('Invalid product ID!');
        }
        const product = await Product.findByPk(id);
        if(!product){
            throw new API404Error(`Product with id ${id} not found!`);
        }
        return product;
    }

    async updateProduct(productData){
        if(!productData || !productData.id){
            throw new API400Error(`Request missing product data!`)
        }
        if(!validate(productData.id) || version(productData.id) !== 4){
            // handle error invalid id
            throw new API400Error('Invalid product ID!');
        }
        await Product.update(
            { name: productData.name, price: productData.price, currency: productData.currency },
            { where: { id: productData.id } }
        );
    }

    async removeProduct(id){
        if(!id){
            throw new API400Error(`Request missing product id!`)
        }
        if(!validate(id) || version(id) !== 4){
            // handle error invalid id
            throw new API400Error('Invalid product ID!');
        }
        await Product.destroy({ where: { id: id } });
    }
}