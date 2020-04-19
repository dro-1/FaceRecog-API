
const handleRegister = (req,res,db,bcrypt) =>{
    const { name,email,password } = req.body;
    if (password.length>=8  && (name&&email) ){
    db('users')
    .returning('*')
    .insert({
        name: name,
        email : email,
        joined : new Date()
    })
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json('Error in registering new user'))

    bcrypt.hash(password,null,null,(err,hash)=>{
        if(err){ res.status(400).json(err)}
        db('login').insert({
            email : email,
            hash : hash
        })
        .catch(err => res.status(400).json(err))
    })
    }
    else{
         res.status(400).json('Invalid form details provided')
    }
}

module.exports = {
    handleRegister:handleRegister
}