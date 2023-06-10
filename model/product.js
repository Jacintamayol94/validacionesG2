const fs = require ('fs');
const path = require('path');

const model = {
    // Ruta del archivo json
    route: '../data/productos.json',

    // traer todos los productos
    findAll: function(){
        const productsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

        const products = JSON.parse(productsJSON);

        return products;

    },
    // traer un producto segun su ID
    findByPk: function(id){
        const products = this.findAll();

        const searched = products.find(product => product.id === id);

        if(!searched) {
            searched = null;
        }

        return searched;

    },
    // eliminar un producto
    deleteById(id){
        let products = this.findAll();

        products = products.filter(product => product.id !==id);

        const productsJSON = JSON.stringify(products)

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON)

        return products;

    },
    // editar un producto
    updateById: function(id, newData){
        const products = this.findAll();
        
        const indice = products.findIndex(productoActual => productoActual.id === id);


        products[indice].name =  newData.name;
        products[indice].price = newData.price;

        const productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

    },
    // Agregar un nuevo producto
    createOne: function (newProduct) {
        let products = this.findAll();
        newProduct.id = products[products.length -1].id + 1;
        products.push(newProduct);
        const productsJSON = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);
    }
}

/*model.updateById(3, {name: 'Oriquidea', price: 800});*/

/*model.createOne({name: 'Plate', category: 'interiorismo', price: 800, retailer: 'Coto'});*/

module.exports = model;