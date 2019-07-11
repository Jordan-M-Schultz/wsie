var express = require('express');
var router = express.Router();
var request = require('request');
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
    const options = {
        url : `https://api.yelp.com/v3/businesses/search?location=${location}&term=${type}`,
        headers : {
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`
        }
    }
    var callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            // console.log(info);
            // let min = 0;
            // let max = info.businesses.length;
            // const random = Math.floor(Math.random()*(max-min+1)+min);
            // res.send(body);
            res.send(JSON.stringify(info.businesses));
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
