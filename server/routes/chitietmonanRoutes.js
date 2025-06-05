const express = require('express');
const router = express.Router();
const Chitietmonan = require('./../models/Chitietmonan')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newChitietmonan = new Chitietmonan(data);
    const response = await newChitietmonan.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Chitietmonan.find(); 
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/:id', async (req,res)=> {
  try {
    const chitietmonanId = req.params.id;
    const updatedChitietmonanData = req.body;

    const response = await Chitietmonan.findByIdAndUpdate(chitietmonanId, updatedChitietmonanData,{
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({error: 'Chi tiết món ăn not found'})
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
    const chitietmonanId = req.params.id;
    const response = await Chitietmonan.findByIdAndDelete(chitietmonanId)
    if (!response) {
      return res.status(404).json({error: 'Chi tiết món ăn not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

module.exports = router