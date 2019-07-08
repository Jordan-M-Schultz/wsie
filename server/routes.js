var express = require('express');
var router = express.Router();
var request = require('request');
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// Define routing here

router.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

router.get('/search', (req,res)=>{
    // res.setHeader('Content-Type', 'application/json');
    const zip = req.query.zip;
    const options = {
        url : 'https://api.yelp.com/v3/businesses/search?location=94087',
        headers : {
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`
        }
    }
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            let min = 0;
            let max = info.businesses.length;
            const random = Math.floor(Math.random()*(max-min+1)+min);

            res.send(JSON.stringify({ returnedText: info.businesses[random] }));
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
