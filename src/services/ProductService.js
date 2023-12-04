const Product = require('../models/Product');
const userService = require('../services/UserService');
const notificationService = require('../services/NotificationService');

class ProductService {

    async createProduct(nmProduct, qtdProduct, qtdMinima, idUser) {
        try{
            const findUser = userService.getUserById(idUser);
            if(!findUser) {
                throw new Error("User not found!");
            }
            let dtProduct = new Date();
            const dtRestock = dtProduct + 60;
            let product = await Product.create({
                nmProduct, 
                qtdProduct, 
                qtdMinima,
                dtRestock,
                idUser
            });

            return product;

        } catch(error) {
            return error
        }
    }

    async getProduct(idUser, idProduct) {
        try{
            let findUser = userService.getUserById(idUser);
            const findProduct = Product.findById({idProduct});
            if (!findProduct){
                throw new Error("Product not found");
            }
            const pctMinima = 0.15
            if(findProduct.qtdProduct <= findProduct.qtdProduct * pctMinima){
                let email = findUser.email;
                let subject = 'ALERT PRODUCT';
                let message = `The product ${findProduct.nmProduct} is almost expired!`;
                notificationService.sendEmail(email,subject,message);
            }
            const dataAtual = new Date();
            const difDays = Math.floor((findProduct.dtRestock - dataAtual)/(1000 * 60 * 60 * 24));
            if(difDays <= 7){
                //send notification;
            }
            return findProduct;
        } catch(error) {
            return error
        }
    }
    async updateProduct(idProduct, qtdProduct) {
        try {
            let findProduct = Product.findById({idProduct});
            if (!findProduct){
                throw new Error("Product not found");
            }
            findProduct.qtdProduct += qtdProduct;
            const dataAtual = new Date();
            const newProduct = findProduct.updateOne({
                qtdProduct: findProduct.qtdProduct,
                dtRestock: dataAtual + 30,
            })
            return newProduct
        } catch(error) {
            return error
        }
    }

    async getProductList(idUser) {
        try{
            let findUser = userService.getUserById(idUser);
            if(!findUser) {
                throw new Error('User not found!');
            }
            const products = await Product.findAll({idUser})
            return products;
        } catch(error) {
            return error
        }
    }
}
module.exports = new ProductService