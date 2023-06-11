const product = require('../model/product');

const controller = {

    home: (req, res) => {
        return res.render('index');
    },
    
    getList: (req, res) => {
            const productos = product.findAll();
            res.render("productList", {
                products: productos,
            })
    },
    getEdit: (req, res) => {
            const id = Number(req.params.id);
    
            const productoAModificar = product.findByPk(id)
    
            if (!productoAModificar) {
                return res.send('error de id');
            }
    
            res.render("productEdit", {
                products: productoAModificar
    });
    },

    getDetail: (req, res) => {
            const id = Number(req.params.id);
    
            const productoAMostrar = product.findByPk(id);
    
            if (!productoAMostrar) {
                return res.send('error de id');
            }
    
            res.render("productDetail", {products: productoAMostrar })
    },

    deleteProduct: (req, res) => {
            const id = Number(req.params.id);
    
            product.deleteById(id);
    
            res.redirect('/product');
    },

    updateProduct: (req, res) => {
            const id = Number(req.params.id);
            const nuevosDatos = req.body;
    
            product.updateById(id, nuevosDatos);
    
            res.redirect('/product');
    },

    
    getCreate: (req, res) => {
            res.render("productCreate")
    },
    
    postProduct: (req, res) => {
            
            let datos = req.body;
    
            datos.id = productModel.length + 1;
    
            datos.valor = Number(datos.valor);
           
            datos.img = req.files.map(file => '/images/products' + file.filename);
    
            product.createOne(datos); 
    
            res.redirect('/product');
    }
    
    };

module.exports = controller;