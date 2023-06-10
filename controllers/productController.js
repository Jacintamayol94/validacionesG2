const product = require('../model/product');

const controller = {

    home: (req, res) => {
        return res.render('index');
    },
    
    getList: (req, res) => {
            const productos = productModel.findAll();
            res.render("productList", {
                products: productos,
            })
    },
    getEdit: (req, res) => {
            const id = Number(req.params.id);
    
            const productoAModificar = productModel.findById(id)
    
            if (!productoAModificar) {
                return res.send('error de id');
            }
    
            res.render("editProduct", {
                products: productoAModificar
    });
    },

    getDetail: (req, res) => {
            const id = Number(req.params.id);
    
            const productoAMostrar = productModel.findById(id);
    
            if (!productoAMostrar) {
                return res.send('error de id');
            }
    
            res.render("productDetail", {products: productoAMostrar })
    },

    deleteProduct: (req, res) => {
            const id = Number(req.params.id);
    
            productModel.deleteById(id);
    
            res.redirect('/product');
    },

    updateProduct: (req, res) => {
            const id = Number(req.params.id);
            const nuevosDatos = req.body;
    
            productModel.updateById(id, nuevosDatos);
    
            res.redirect('/product');
    },

    
    getCreate: (req, res) => {
            res.render("createProduct")
    },
    
    postProduct: (req, res) => {
            
            let datos = req.body;
    
            datos.id = productModel.length + 1;
    
            datos.valor = Number(datos.valor);
           
            datos.img = req.files.map(file => '/images/productos' + file.filename);
    
            productModel.createOne(datos); 
    
            res.redirect('/product');
    }
    
    };

module.exports = controller;