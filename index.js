const express = require("express");
const app = express();
const cors = require("cors");
// Other Files
require('./db/Confing');
const User = require("./db/User");
const Product = require('./db/Prodcut');
// Apicall
app.use(express.json());
app.use(cors());

// Router 
app.get('/', (req, res) => {

    res.send("Hello MERN JS ...");
    console.log("Success Port");
});

app.post("/register", async (req, res) => {

    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);
})

app.post('/login', async (req, res) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "No User Found....." })
        }
    } else {
        res.send({ result: "No User Found....." })
    }

});

app.get('/login/:id', async (req, res) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body);
    }
        res.send(user);

});

app.post('/addproduct', async (req, res) => {

    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.get('/product', async (req, res) => {

    let products = await Product.find();
    if (products.length > 0) {

        res.send(products);
    } else {
        res.send({ result: "No products found" });
    }
});

app.delete("/product/:id", async (req, res) => {

    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
});

app.get('/product/:id', async (req, res) => {

    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "no Reacord Found" });
    }
});

app.put('/product/:id',async(req,res)=>{

    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
        )
        res.send(result);
        console.log(req.body);
});

app.get('/search/:key',async(req,res)=>{

    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    });
    res.send(result);
})

app.listen(5000);