const express = require('express');
const router = express.Router();
const Chitietdichvu = require('./../models/Chitietdichvu')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newChitietdichvu = new Chitietdichvu(data);
    const response = await newChitietdichvu.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Chitietdichvu.find(); 
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/:id', async (req,res)=> {
  try {
    const chitietdichvuId = req.params.id;
    const updatedChitietdichvuData = req.body;

    const response = await Chitietdichvu.findByIdAndUpdate(chitietdichvuId, updatedChitietdichvuData,{
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({error: 'Chi tiết dịch vụ not found'})
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
    const chitietdichvuId = req.params.id;
    const response = await Chitietdichvu.findByIdAndDelete(chitietdichvuId)
    if (!response) {
      return res.status(404).json({error: 'Chi tiết dịch vụ not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

module.exports = router