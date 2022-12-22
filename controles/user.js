const express = require('express');

const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
router.post('/register',async(req,res)=>{

    data = req.body;
    usr = new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptPass = await bcrypt.hashSync(data.password , salt);

    usr.password = cryptPass;


    usr.save().then((saved)=>{
        res.status(200).send(saved)

    }).catch(
        (err)=>{
            res.status(400).send(err)
        }
    )

});





//1 er méthode
router.post('/add',(req,res)=>{

    data = req.body;
    usr = new User(data);

    usr.save().then((savedUser)=>{
        res.status(200).send(savedUser)

    }).catch(
        (err)=>{
            res.status(400).send(err)
        }
    )

});
//2 éme méthode
router.post('/create',async (req,res)=>{
    try{
        data= req.body;
        usr= new User(data);

       savedUser= await usr.save();
        res.send(savedUser)
    }catch(error){
        res.send(error)
    }
})

//1 er méthode
router.get('/getall',(req,res)=>{
    User.find().then(
        (users)=>{
            res.send(users);
        }
    ).catch((err)=>{
        res.send(err)
    })
    
});

//2 éme méthode
router.post('/all',async (req,res)=>{
    try{
        users= await User.find();
        res.send(users);
    }catch(error){
        res.send(error)
    }
})


router.get('/getById', async(req,res)=>{
    try{
        id= req.params.id;
        user= await User.findById({f_id : id})
        res.send(user);
    }catch(error){
        res.send(error)
    }
})

router.put('/update',async(req,res)=>{
    try{
        id = req.params.id;
        newData = req.body;

        updated= await User.findByIdAndUpdate({_id: id}, newData);
        res.send(updated);
    }catch(error){
        console.log(error);
    }

});

router.delete('/delete',async (req,res)=>{
    try{
        id= req.params.id 
        deleteUser = await User.findByIdAndDelete({f_id: id});
        res.send(deleteUser);
    }catch(error){
        res.send(error)
    }
})



module.exports = router;