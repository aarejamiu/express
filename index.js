const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.get('/products', (req, res) => {
    const products = [
        {
            name: "Laptop",
            price: 500000,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
        },
        {
            name: "Phone",
            price: 200000,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
        },
        {
            name: "Headphones",
            price: 50000,
            image: "https://images.unsplash.com/photo-1518443895914-0d7b1c6b6b64"
        }
    ];

    let html = "<h1>My Products</h1>";

    products.forEach(product => {
        html += `
            <div style="margin-bottom:20px;">
                <img src="${product.image}" width="150"/>
                <h3>${product.name}</h3>
                <p>Price: ₦${product.price}</p>
            </div>
        `;
    });

    res.send(html);
});
app.listen(process.env.PORT,(error)=>{
    if(error){
        console.log(`Error occurred while starting the server: ${error}`);
    }else{
        console.log(`Server is running`);
    }
})