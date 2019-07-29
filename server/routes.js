var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config(); //auto load env information 

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// Define routing here

router.get('/search', (req,res)=>{
    // res.setHeader('Content-Type', 'application/json');
    const type = req.query.term;
    const location = req.query.location;
    const price = req.query.price;
    const openNow = req.query.open_now;
    const attributes = req.query.attributes;

    var reqURL = `https://api.yelp.com/v3/businesses/search?location=${location}&term=${type}`
    
    if(price)
        reqURL += `&price=${price}`
    if(openNow)
        reqURL += `&open_now=${openNow}`
    if(attributes)
        reqURL += `&attributes=${attributes}`

    const options = {
        url : reqURL,
        headers : {
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`
        }
    }
    var callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            let min = 0;
            let max = info.businesses.length;
            const random = Math.floor(Math.random()*(max-min+1)+min);
            res.send(JSON.stringify(info.businesses[random]));
        }else{
            //current catchall for errors
            res.statusCode = 400;
            res.send('Error, bad request');
        }
    }

    request(options, callback)
    

});

router.get('/api', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});


module.exports = router;
