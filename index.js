const express = require('express');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
// const connectDB = require("./config/connectDB")
const dotenv  = require('dotenv');
dotenv.config();
const stripe = require('stripe')(('sk_test_51ODQzkSE1wNzm1KdnByaieqzJBTs0knlCmANiqspGUuUvzNv81ECbBjM46sP7iLqXRVRozAhzTme83QG58MoaG7c00D7V5LKre'))





const app = express();
const port = process.env.PORT || 8000
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

//* Middleware

app.use(express.json());
app.use(express.static('public'));
// app.use(cookieParser());
app.use(cors(corsOptions))

// "sk_test_51ODQzkSE1wNzm1KdnByaieqzJBTs0knlCmANiqspGUuUvzNv81ECbBjM46sP7iLqXRVRozAhzTme83QG58MoaG7c00D7V5LKre"


app.get('/', (req, res)=> {
    res.send("ecommerce web server runnning")
})


// Endpoint to create a PaymentIntent
app.post('/create-checkout-session', async (req, res) => {
  console.log(req.body.length)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Example Product',
            },
            unit_amount: 1000, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect URL after successful payment
      cancel_url: 'http://localhost:3000/cancel', // Redirect URL if payment is canceled
    });
  
    res.send({ url: session.url });
  } catch (error) {
    res.send(error.message)
  }
  
  })

  


app.listen(port, ()=> {
    
    console.log(`Server is running with ` + port)
    // connectDB()
})


/*


  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10000, // Amount in the smallest currency unit (e.g., 100 BDT)
      currency: 'bdt',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  */