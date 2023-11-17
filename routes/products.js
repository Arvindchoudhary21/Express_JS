const router = require('express').Router(); // created router
const ErrorHandler = require('../errors/ErrorHandler');
let products = require('../productData')
router.get('/products', (req, res) => {

    // res.sendFile(path.resolve(__dirname) + '/about.html');  // pass the directory of html file and dont use send use sendfile kiuki file send krni hai

    res.render('products', {
        title: 'My Products page'
    }) //so ejs file ko render method se render krna hota hai and ye automatically views folder me file ke name se search krti hai files ko and iske 2 parameter hote hai first name file ka and second data jo send krna hai .ejs file ko 
})


router.get('/api/products', (req, res) => {

    res.json(products); //sending products array to the products.ejs file/
})

router.post('/api/products', (req, res, next) => {

    const { name, price } = req.body;

    if (!name || !price) {
        next(ErrorHandler.validationError('name and price fields are required'));
        // throw new Error('all fields are required')
        // return res.status(422).json({ error: "all fields are required" })
    }
    const product = {
        id: new Date().getTime().toString(),
        name: name,
        price: price,
    }
    products.push(product)
    // console.log(req.body); // working fine

    res.json(products); //sending products array to the products.ejs file/
})


// for delete 
router.delete('/api/products/:productId', (req, res) => {
    products = products.filter((product) => req.params.productId !== product.id); // params jo last me hoga productid osko extract kr leta hai :id bhi likhte to ye id jo last me hai link ke osko extract kr leta
    res.json({ status: "ok" });
    res.json(products); // after adding products ko send kro to the client side
})


module.exports = router;