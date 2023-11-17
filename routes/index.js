// so agar bhot sara page hoga to app.get() bohot bar likhna hoga in server .js so the correct way is write all the get method here in router and yha se tum export kr do taki server file clean rhe 

const router = require('express').Router(); // created router

const apiKeyMiddleware = require('../middlewares/apiKey')


// router.use(apiKeyMiddleware); // ab har page par middle ware work krega agar api key correct hai tabhi tum os page par jaoge nhi to not allowed message show krega for example -> http://localhost:3000/?api_key=1234567 then home page open hoga nhi to nhi hoga



router.get('/', (req, res) => {

    // res.sendFile(path.resolve(__dirname) + '/index.html'); // pass the directory of html file and dont use send use sendfile kiuki file send krni hai

    res.render('index', {
        title: 'My home page'
    }) //so ejs file ko render method se render krna hota hai and ye automatically views folder me file ke name se search krti hai files ko 
})


router.get('/about', (req, res) => {

    // res.sendFile(path.resolve(__dirname) + '/about.html');  // pass the directory of html file and dont use send use sendfile kiuki file send krni hai

    res.render('about', {
        title: 'My about page'
    }) //so ejs file ko render method se render krna hota hai and ye automatically views folder me file ke name se search krti hai files ko and iske 2 parameter hote hai first name file ka and second data jo send krna hai .ejs file ko 
})


// for download something
router.get('/download', (req, res) => {
    res.download(path.resolve(__dirname) + '/about.html'); //remember res.downlaod bas yhi
})

// for handling api requests (we have to send json data) and to apply multiple middleware in single route then pass array of middlewares 
// router.get('/api/products', apiKeyMiddleware, (req, res) => {
//     res.json([
//         {
//             id: 123,
//             name: "Chrome"
//         },
//         {
//             id: 124,
//             name: "firefox"
//         }
//     ])
// })



module.exports = router;