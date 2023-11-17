const express = require('express') // get the express module
const app = express(); // get methods of express

const mainRouter = require('./routes/index');//exported from routes
const productRouter = require('./routes/products');
const ErrorHandler = require('./errors/ErrorHandler');

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs'); // set method kuch setting customization ke liye kam ati hai jaise template engine set krna hai and ejs -> html me javascript ghusane me help krta hai and ejs by default views folder me files search krta hai kiuki agar tum log kroge console.log(app.get(views)) then ye current directory plus /views return krega but tum is default directory ko change bhi kr sakte ho but acha hoga ki tum views folder banao and osme store kro and views file ke liye render method lagta hai sendFile method nhi lagta ok

app.use(express.static('public')) // static files hai it is middleware
app.use(express.json()) // ek Express.js middleware hai jo incoming requests ke sath judi JSON data ko parse karne mein madad karta hai.


app.use(productRouter);
app.use(mainRouter); // used to render the data from the index.js in routes

// middleware for error handling
app.use((req, res, next) => {
    return res.json({ message: "page not found" });
})

// express error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    }
    // console.log('error : ', err.message);
    // res.json({ message: err.message });
})


// const path = require('path');// we need path module to get the path of html pages

// to send the data from server use get method
// app.get('/', (req, res) => {

//     // res.sendFile(path.resolve(__dirname) + '/index.html'); // pass the directory of html file and dont use send use sendfile kiuki file send krni hai

//     res.render('index', {
//         title: 'My home page'
//     }) //so ejs file ko render method se render krna hota hai and ye automatically views folder me file ke name se search krti hai files ko 
// })

// app.get('/about', (req, res) => {

//     // res.sendFile(path.resolve(__dirname) + '/about.html');  // pass the directory of html file and dont use send use sendfile kiuki file send krni hai

//     res.render('about', {
//         title: 'My about page'
//     }) //so ejs file ko render method se render krna hota hai and ye automatically views folder me file ke name se search krti hai files ko and iske 2 parameter hote hai first name file ka and second data jo send krna hai .ejs file ko 
// })

// for download something
// app.get('/download', (req, res) => {
//     res.download(path.resolve(__dirname) + '/about.html'); //remember res.downlaod bas yhi
// })


// listen method takes port and callback function
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})