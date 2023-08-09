/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51NPzygSEQOKz7pBzvZNmamu9ZFwTDeU6iRc58lYYstJAdT1gjZgVAS8dRIWclBomWIq9PFvw5Nv7akJUPm3Y9prL00dPzfZeCp"
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HI");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment req recieved fot this amt", total);
  const paymentIntent = await stripe.paymentIntent.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/ecommerce-website-47994/us-central1/api
