
const handleProfile = (req,res,db) => {

    const { id } = req.params;
   
    db('users').where('id',id)
    .then(user =>{
        user.length 
       ? res.json(user[0])
       : res.status(400).json('User not found')
    }
    )
    .catch(err => res.status(400).json('An unexpected error occurred'));
}

module.exports = {
    handleProfile : handleProfile
}