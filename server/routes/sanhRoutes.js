const express = require('express');
const router = express.Router();
const Sanh = require('./../models/Sanh')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newSanh = new Sanh(data);
    const response = await newSanh.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Sanh.find(); 
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

module.exports = router