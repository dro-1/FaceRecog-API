
const handleImage = (req,res,db) => {
    const { id } = req.body;
    
    db('users')
    .returning('entries')
    .where({id:id})
    .increment('entries',1)
    .then(entryCount =>{ 
        entryCount.length
       ? res.json(entryCount[0])
       : res.status(400).json("User doesn't exist")
    })
    .catch(err=>res.status(400).json("There was an image error!!!"))
}

module.exports = {
    handleImage : handleImage
}