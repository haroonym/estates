const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const db = require('../db');

router.get(
  '/test',
  asyncHandler(async (req, res) => {
    const { rows } = await db.query('SELECT b FROM (VALUES (1, \'This works!\')) temp (a, b)');
    res.json(rows);
  }),
);

module.exports = router;
