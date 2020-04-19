const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'dfda414ff75c4e2cabe409b1021ba3a2'
   });

const handleClarifaiCall = (req,res) =>{
    const { imageURL } = req.body;
    app.models.predict("a403429f2ddf4b49b307e318f00e528b",imageURL)
    .then(response=>{
        res.json(response)
    })
}
module.exports = {
    handleClarifaiCall
}