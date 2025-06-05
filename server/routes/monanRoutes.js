const express = require('express');
const router = express.Router();
const Monan = require('./../models/Monan')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMonan = new Monan(data);
    const response = await newMonan.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Monan.find(); 
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/:id', async (req,res)=> {
  try {
    const monanId = req.params.id;
    const updatedMonanData = req.body;

    const response = await Monan.findByIdAndUpdate(monanId, updatedMonanData,{
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({error: 'Món ăn not found'})
    }
    console.log('data updated')
    res.status(200).json(response)
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

router.delete('/:id', async (req,res)=> {
  try {
    const monanId = req.params.id;
    const response = await Monan.findByIdAndDelete(monanId)
    if (!response) {
      return res.status(404).json({error: 'Món ăn not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

module.exports = router