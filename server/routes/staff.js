const express = require('express');
const { getStaff, addStaff, deleteStaff } = require('../controllers/staff');

const router = express.Router();

router.get('/staff', getStaff);
router.post('/staff', addStaff);
router.delete('/staff/:id', deleteStaff);

module.exports = router;
