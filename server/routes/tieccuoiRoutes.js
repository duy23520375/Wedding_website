const express = require('express');
const router = express.Router();
const Tieccuoi = require('./../models/Tieccuoi')

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newTieccuoi = new Tieccuoi(data);
    const response = await newTieccuoi.save();
    console.log('Data saved');
    res.status(200).json(response); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Tieccuoi.find(); 
    console.log('Data fetched',data);
    res.status(200).json(data); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

router.put('/:id', async (req,res)=> {
  try {
    const tieccuoiId = req.params.id;
    const updatedTieccuoiData = req.body;

    const response = await Tieccuoi.findByIdAndUpdate(tieccuoiId, updatedTieccuoiData,{
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({error: 'Tiệc cưới not found'})
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
    const tieccuoiId = req.params.id;
    const response = await Tieccuoi.findByIdAndDelete(tieccuoiId)
    if (!response) {
      return res.status(404).json({error: 'Tiệc cưới not found'})
    }
    console.log('data delete')
    res.status(200).json({message: 'deleted successfully'})
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message }); 
  }
})

module.exports = router