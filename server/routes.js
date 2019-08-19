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
    var reqURL = process.env.YELP_REQUEST_URL + `?location=${req.query.location}&limit=50` 

    //Iterate and generate url based on parameters
    for(var param in req.query)
        if(param === 'location')
            continue 
        else
            reqURL += `&${param}=${req.query[param]}`
    
    var options = {
        url : reqURL,
        headers : {
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`
        }
    }
    

    const getData = async () => {
        try {
            const restaurantList = await doRequest(options); //fetch of all 50 restaurants given search criteria
            
            if(!restaurantList || restaurantList.businesses.length === 0)
                throw "No restaurants Found given criteria"

            //choose random restaurant to return
            let min = 0;
            let max = restaurantList.businesses.length - 1;
            let random = Math.floor(Math.random()*(max-min+1)+min);

            options.url = `https://api.yelp.com/v3/businesses/${restaurantList.businesses[random].id}/reviews`;
            
            //fetch reviews given specific ID
            const restaurantData = await doRequest(options); 
            let payload = restaurantList.businesses[random];
            payload = Object.assign(payload, restaurantData);
            // console.log(payload)
            // console.log(payload['reviews'][0].user)
            
            res.send(JSON.stringify(payload))

        } catch (err) {
            console.log(err)
            res.status(400).json({ err: err.toString() });
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
          if (!error && res.statusCode === 200) { //if null & promise returned 
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
