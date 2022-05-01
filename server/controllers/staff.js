/* eslint-disable max-len */
const asyncHandler = require('express-async-handler');
const model = require('../model/staff');

const getStaff = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getStaff());
});

const addStaff = asyncHandler(async (req, res) => {
  const { name, image, office, phone } = req.body;
  if (name == null || image == null || office == null || phone == null) {
    res.status(404).json('Überprüfen Sie, ob Sie alle Felder ausgefüllt haben');
  } else {
    res
      .status(200)
      .send(`Der Agent ${name} wurde erfolgreich hinzugefügt`)
      .json(await model.addStaff(req.body));
  }
});

const deleteStaff = asyncHandler(async (req, res) => {
  const rows = await model.getStaffByID(req.params.id);
  // console.log(rows);
  if (rows.length > 0) {
    res
      .status(200)
      .send(`Der Staff mit der ID ${req.params.id} wurde erfolgreich aus der Datenbank entfernt`)
      .json(await model.deleteStaff(req.params.id));
  } else {
    res.status(404).json(`Der Staff mit der ID ${req.params.id} wurde nicht gefunden`);
  }
});

module.exports = { getStaff, addStaff, deleteStaff };
