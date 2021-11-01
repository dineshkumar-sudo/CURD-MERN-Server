const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodeModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://newuser:12345@crud.f0rnc.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post("/insert", async(req, res)=>{
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodeModel({foodName: foodName , daysIAte: days });

    try {
        await food.save();
        res.send("Inserted successfully");
    } catch (error) {
        console.log(error);
    }
});

app.get("/read", async(req, res)=>{
    FoodeModel.find({}, (err, result) => {
        if(err){
            res.send(err);
        }


        res.send(result);
        
    })
});

app.put("/update", async(req, res)=>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    

    try {
        await  FoodeModel.findById(id, (err, updatedFood) =>
        {
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        }); 
    } catch (err) {
        console.log(err);
    }
});

app.get("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    res.send(id);
})
app.listen(3001 , () =>{
    console.log("Server running successfully in  3001");
});