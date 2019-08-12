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

    var reqURL = `https://api.yelp.com/v3/businesses/search?location=${location}&term=${type}&limit=50`
    
    if(price)
        reqURL += `&price=${price}`
    if(openNow)
        reqURL += `&open_now=${openNow}`
    if(attributes)
        reqURL += `&attributes=${attributes}`

    var options = {
        url : reqURL,
        headers : {
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`
        }
    }
    // var callback = (error, response, body) => {
    //     if (!error && response.statusCode == 200) {
    //         const info = JSON.parse(body);
    //         let min = 0;
    //         let max = info.businesses.length - 1;
    //         const random = Math.floor(Math.random()*(max-min+1)+min);
    //         // const retObj = {
    //         //     businessInfo : info.businesses[random],
    //         //     reviews : 
    //         // }
    //         res.send(JSON.stringify(info.businesses[random]));
    //     }else{
    //         //current catchall for errors
    //         res.statusCode = 400;
    //         res.send('Error, bad request');
    //     }
    // }

    // request(options, callback)
    

    const getData = async () => {
        try {
            const restaurantList = await doRequest(options); //fetch of all 50 restaurants given search criteria
            if(!restaurantList || restaurantList.businesses.length === 0){
                throw "No restaurants Found given criteria"
            }
            

            let min = 0;
            let max = restaurantList.businesses.length;
            let random = Math.floor(Math.random()*(max-min+1)+min);
            options.url = `https://api.yelp.com/v3/businesses/${restaurantList.businesses[random].id}/reviews`;
            
            const restaurantData = await doRequest(options); //fetch reviews given specific ID
            let payload = restaurantList.businesses[random];
            payload = Object.assign(payload, restaurantData);
            console.log('shouldnt');
            res.send(JSON.stringify(payload))
        } catch (err) {
            console.log(err)
            res.status(400).json({ err: err.toString() });
            // res.status(404).send('bad')
        }
      }
    getData();
});

router.get('/api', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const doRequest = (options) => {
    return new Promise(function (resolve, reject) {
        request(options, function (error, res, body) {
          if (!error && res.statusCode == 200) { //if null & promise returned 
            resolve(JSON.parse(body));
          } else {
            console.log(res.statusCode); 
                if(!error)
                    reject(body); //request resolved, send body info
                else
                    reject(error); //TPC error, request didn't resolve
          }
        });
      });
}    


module.exports = router;
