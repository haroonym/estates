const db = require('../db');

async function getEstates() {
  const { rows } = await db.query(
    'select estates.id, estates.title, estates.image, estates.postcode, estates.bedrooms, estates.bathrooms, estates.preis, c.name as city, c.country, s.staff_id, s.name, s.image staffimg, s.phone, s.office from estates join cities c on c.city_id = estates.city_id join staff s on s.staff_id = estates.staff_id order by id',
  );
  return rows;
}

async function getEstatesbyPreis(query) {
  const { preis } = query;
  const { rows } = await db.query(
    'select estates.id, estates.title, estates.image, estates.postcode, estates.bedrooms, estates.bathrooms, estates.preis, c.name as city, c.country, s.staff_id, s.name, s.image staffimg, s.phone, s.office from estates join cities c on c.city_id = estates.city_id join staff s on s.staff_id = estates.staff_id where estates.preis = $1 order by id',
    [preis],
  );
  return rows;
}

async function getEstateByID(id) {
  const { rows } = await db.query('select * from estates where id = $1 order by id', [id]);
  return rows;
}

async function deleteEstate(id) {
  await db.query('DELETE from estates where id = $1', [id]);
}

async function changeEstate(id, body) {
  await db.query('update estates set title = $1, preis = $2 where id = $3;', [body.title, body.preis, id]);
}

module.exports = { getEstates, deleteEstate, getEstateByID, changeEstate, getEstatesbyPreis };
