// it check for correct api request

function apiKey(req, res, next) {
    // api key which we check 
    const api_key = '1234567';
    console.log(req.query); // showing in terminal the api key passing in browser
    const userApiKey = req.query.api_key;
    if (userApiKey && (userApiKey === api_key)) {
        next(); // if not write then hang ho jayega page
    } else {
        res.json({ message: "not allowed" })
    }


}

module.exports = apiKey;        