
const handleSignIn = (req,res,db,bcrypt)=>{

    const { email,password } = req.body;
    
    db('users')
    .where({'users.email':email})
    .select('login.hash','users.email','users.id','users.name','users.entries','users.joined')
    .join('login','users.email','login.email')
    .then(hash=>{
        bcrypt.compare(password,hash[0].hash,(err,bres)=>{
            bres
            ? res.json({
                id: hash[0].id,
                email: hash[0].email,
                name: hash[0].name,
                entries: hash[0].entries,
                joined: hash[0].joined
            })
            : res.status(400).json('Password/Username Mismatch')
        })
    })
    .catch(err=> { 
        console.log(err)
        res.status(400).json('An error occurred in sign in')
    })

}

module.exports = {
    handleSignIn:handleSignIn
}