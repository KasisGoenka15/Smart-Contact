const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const pool = require("../db");

router.post("/contact",
[
  body("fullName").isLength({min:3}),
  body("email").isEmail(),
  body("message").isLength({min:10})
],
async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json(errors);

  const { fullName,email,phone,message } = req.body;
  await pool.query(
    "INSERT INTO contacts (full_name,email,phone,message) VALUES ($1,$2,$3,$4)",
    [fullName,email,phone,message]
  );
  res.json({message:"Submitted"});
});
module.exports = router;
