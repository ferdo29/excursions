import express from 'express'
import Stripe from 'stripe'

const app = express()
const port = 3000
const PUBLIC_KEY = 'pk_test_51KB35SCovcxLQ3JZcbT4gECEK7PAeZ2hHbspw3xqhuRWTR14fdTQQggB8uoP5BENuCvdinwz8Ef0W2MAgGQMjAEk00yJV1hhWg'
const SECRET_KEY = 'sk_test_51KB35SCovcxLQ3JZdfEZh3FTx9ikcl7kwfM3HS5EXL7OExu4Kupy37Gp583UwUQvHaI5TliK2h9dwcWJ6fddnDf900zUtSv1xl'
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
    console.log('Server work in 3000 port')
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099, //lowest denomination of particular currency
            currency: "usd",
            payment_method_types: ["card"], //by default
        });

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret,
        });
    } catch (e) {
        console.log(e.message);
        res.json({ error: e.message });
    }
});