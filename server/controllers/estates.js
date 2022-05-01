/* eslint-disable max-len */
const asyncHandler = require('express-async-handler');
const model = require('../model/estates');

const getEstates = asyncHandler(async (req, res) => {
  if (req.query.preis) {
    res.status(200).json(await model.getEstatesbyPreis(req.query));
  } else {
    res.status(200).json(await model.getEstates());
  }
});

const deleteEstate = asyncHandler(async (req, res) => {
  const rows = await model.getEstateByID(req.params.id);
  // console.log(rows);
  if (rows.length > 0) {
    res
      .status(200)
      .send(`Die Immobilie mit der ID ${req.params.id} wurde erfolgreich aus der Datenbank entfernt`)
      .json(await model.deleteEstate(req.params.id));
  } else {
    res.status(404).json(`Die Immobilie mit der ID ${req.params.id} wurde nicht gefunden`);
  }
});

const changeEstate = asyncHandler(async (req, res) => {
  const { title, preis } = req.body;
  const rows = await model.getEstateByID(req.params.id);
  if (title != null || preis != null) {
    if (rows.length > 0) {
      res
        .status(200)
        .send(`Die Immobilie mit der ID ${req.params.id} wurde erfolgreich geändert`)
        .json(await model.changeEstate(req.params.id, req.body));
    } else {
      res.status(404).send(`Die Immobilie mit der ID ${req.params.id} konnte nicht gefunden werden`);
    }
  } else {
    res.status(404).send('Bitte füllen Sie die Parameter title und preis aus');
  }
});
module.exports = { getEstates, deleteEstate, changeEstate };
