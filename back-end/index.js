const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();  
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const userSchema = new mongoose.Schema({email:String,age:Number,name:String})

const User = mongoose.model('users',userSchema);

// CRUD Operations
// GET
app.get('/users', async(req, res) => {
    const userz = await User.find();
    res.json(userz);
});
// POST
app.post('/users',async(req,res)=>{
    try{
    const {name, email, age} = req.body;
    const user = new User({name, email, age})
    await user.save();
    res.json({user}).status(203);
    }
    catch(err){
        return res.status(404).json(err);
    }
})

app.get('/users/:id',async(req,res)=>{
    try{
        const id = req.params.id;

        const newuser=await User.findById(id);
        res.json(newuser);
    }
    catch(err){
        return res.status(404).json(err);
    }})
    app.put('/users/:id',async(req,res)=>{
        const id=req.params.id
        const {name,age,email}=req.body;
        const newuser=await User.findByIdAndUpdate(id,{name, email,age});
        res.json(newuser).status(200);
    })

    app.delete('/users/:id',async(req,res)=> {
        try{
            const id=req.params.id;
            const newuser=await User.findByIdAndDelete(id)
            res.json('user deleted successfully',newuser).status(200);

        }
        catch(err){
            return res.status(404).json(err);
        }
    }
    )








// CORS as a Solution:
// CORS provides a controlled way to relax this restriction, allowing web applications to make requests to other domains while maintaining security. 
// How it Works:
// CORS works by adding new HTTP headers that let servers describe which origins are permitted to read information from a web browser. 

app.listen(3000,()=>console.log('Server is running on port 3000'));






