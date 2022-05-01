const express = require('express');
const { getEstates, deleteEstate, changeEstate } = require('../controllers/estates');

const router = express.Router();

router.get('/estates', getEstates);
router.delete('/estate/:id', deleteEstate);
router.patch('/estate/:id', changeEstate);

module.exports = router;
