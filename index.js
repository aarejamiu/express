const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('images'))
app.get('/products', (req, res) => {
    const products = [
        {
            name: "Laptop",
            price: 500000,
            image: "/Laptop.jpg"
        },
        {
            name: "Phone",
            price: 200000,
            image: "/Phone.jpg"
        },
        {
            name: "Headphones",
            price: 50000,
            image: "/Hphone.jpg"
        },
        {
            name: "Smart Watch",
            price: 80000,
            image: "/smartwatch.jpg"
        },
        {
            name: "Bluetooth Speaker",
            price: 40000,
            image: "/speaker.webp"
        },
        {
            name: "Gaming Mouse",
            price: 25000,
            image: "/mouse.jpg"
        },
        {
            name: "Keyboard",
            price: 30000,
            image: "/keyboard.jpg"
        },
        {
            name: "Tablet",
            price: 180000,
            image: "/tablet.jpg"
        },
        {
            name: "Camera",
            price: 350000,
            image: "/camera.webp"
        },
        {
            name: "Power Bank",
            price: 15000,
            image: "/power-bank.jpg"
        }   
    ];

    let html = "<h1>My Products</h1>";

    products.forEach(product => {
        html += `
            <div style="border:1px solid #ccc; padding:10px; margin:10px; width:200px;">
            <img src="${product.image}" style="width:100%; height:150px; object-fit:cover;" />
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