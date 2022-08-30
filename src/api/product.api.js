import { ProductService } from '../services/index.js';
import { InfoLogger } from '../utils/logger.js';

const SuccessCode = {
    'OK': 200,
    'CREATED': 201
}

export async function ProductAPI (app, producer, esClient) {

    const productService = new ProductService(producer);
    // const esService = new ESService(esClient);


    app.post('/products', async (req, res, next) => {
        try{
            const productData = {
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            await productService.AddProduct(productData);
            // await esService.AddProduct(productData);
            const info = `${new Date()} Request id: ${req.id}. POST /products ${SuccessCode.CREATED} Product added successfully`;
            await InfoLogger.log(info);
            res.status(SuccessCode.CREATED).send({
                message: "Product added successfully"
            })
        }
        catch(err) {
            // handle
            next(err);
        }
        
    });

    app.get('/products', async (req, res, next) => {
        try{

            if(req.query.id){
                const product = await productService.GetProductById(req.query.id);
                const info = `${new Date()} Request id: ${req.id}. GET /products ${SuccessCode.OK} Product with id ${req.query.id} fetched successfully`;
                await InfoLogger.log(info);
                res.status(SuccessCode.OK).json({
                    message: "Success",
                    data: product
                });
            }
            else{
                let pagination = {};
                if(req.query.limit && req.query.offset){
                    pagination.limit = +req.query.limit;
                    pagination.offset = +req.query.offset
                }
                const products = await productService.GetProducts(pagination);
                const info = `${new Date()} Request id: ${req.id}. GET /products ${SuccessCode.OK} Products fetched successfully`;
                InfoLogger.log(info);
                res.status(SuccessCode.OK).json({
                    message: "Success",
                    data: products
                })
            }
        }
        catch(err){
            next(err);
        }
    });

    app.put('/products', async (req, res, next) => {
        try{
            const data = {
                id: req.query.id,
                name: req.body.name,
                price: req.body.price,
                currency: req.body.currency
            }
            await productService.UpdateProduct(data);
            const info = `${new Date()} Request id: ${req.id}. PUT /products ${SuccessCode.OK} Product with id ${req.query.id} updated successfully`;
            await InfoLogger.log(info);
            res.status(SuccessCode.OK).json({
                message: "Record updated successfully"
            });
        }
        catch(err){
            next(err);
        }
    })

    app.delete('/products', async (req, res, next) => {
        try{
            await productService.DeleteProduct(req.query.id);
            const info = `${new Date()} Request id: ${req.id}. DEL /products ${SuccessCode.OK} Product with id ${req.query.id} deleted successfully`;
            await InfoLogger.log(info);
            res.status(SuccessCode.OK).json({
                message: "Record deleted successfully"
            })
        }
        catch(err){
            next(err);
        }
    })

    app.post('/products/add_to_cart', async (req, res, next) => {
        try{
            const payload = {
                productId: req.body.productId,
                cartId: req.body.cartId,
                quantity: req.body.quantity
            }
            await productService.AddToCart(payload);
            const info = `${new Date()} Request id: ${req.id}. POST /products/add_to_cart ${SuccessCode.OK} Product payload sent to queue successfully`;
            await InfoLogger.log(info);
            res.status(SuccessCode.OK).json(payload);
        }
        catch(err) {
            // handle
            next(err);
        }

    })

}