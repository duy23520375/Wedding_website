const express = require('express');
const router = express.Router();
const Hoadon = require('./../models/Hoadon')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newHoadon = new Hoadon(data);
    const response = await newHoadon.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Hoadon.find(); 
    console.log('Data fetched');
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/:id', async (req,res)=> {
  try {
    const hoadonId = req.params.id;
    const updatedHoadonData = req.body;

    const response = await Hoadon.findByIdAndUpdate(hoadonId, updatedHoadonData,{
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({error: 'Hóa đơn not found'})
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
    const hoadonId = req.params.id;
    const response = await Hoadon.findByIdAndDelete(hoadonId)
    if (!response) {
      return res.status(404).json({error: 'Hóa đơn not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

module.exports = router