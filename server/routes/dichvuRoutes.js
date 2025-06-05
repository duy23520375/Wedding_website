const express = require('express');
const router = express.Router();
const Dichvu = require('./../models/Dichvu')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newDichvu = new Dichvu(data);
    const response = await newDichvu.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Dichvu.find(); 
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/:id', async (req,res)=> {
  try {
    const dichvuId = req.params.id;
    const updatedDichvuData = req.body;

    const response = await Dichvu.findByIdAndUpdate(dichvuId, updatedDichvuData,{
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({error: 'Dịch vụ not found'})
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
    const dichvuId = req.params.id;
    const response = await Dichvu.findByIdAndDelete(dichvuId)
    if (!response) {
      return res.status(404).json({error: 'Dịch vụ not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

module.exports = router