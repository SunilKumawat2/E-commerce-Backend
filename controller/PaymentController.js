// Importing required modules
const Payment = require("../models/Payment");
const stripe = require("stripe")("sk_test_51OlpYMSCNujN812W8yzHmmUscDxtcgd3artFiXeLs6zdpxoLE4J85LCRJsRM5St08DBvaRUpnK6mso9Kjv659J4O00jY50Dn6G");



// Controller to create a payment
const CreatePayment = async (req, res) => {
  const { amount,id } = req.body;
  try {
const payment = await stripe.paymentIntents.create({
  amount:amount,
  currency:"USD",
  description:"Hello this is Tsting Payment",
  payment_method:id,
  confirm:true
})
console.log("Payment",payment)
return res.status(200).json({status:200,message:"successfully Fetch the Payment",success:true})

}catch(error){
  console.log("error",error)
  return res.status(500).json({status:500,message:"Server Side error Fetch the Payment"})
}
}

// Exporting the controller
module.exports = { CreatePayment };
