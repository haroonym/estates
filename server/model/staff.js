const db = require('../db');

async function getStaff() {
  const { rows } = await db.query('select * from staff');
  return rows;
}

async function addStaff(body) {
  await db.query('insert into staff (name, image, phone, office) values ($1,$2,$3,$4)', [
    body.name,
    body.image,
    body.phone,
    body.office,
  ]);
}

async function getStaffByID(id) {
  const { rows } = await db.query('select * from staff where staff_id = $1', [id]);
  return rows;
}

async function deleteStaff(id) {
  await db.query('DELETE from staff where staff_id = $1', [id]);
}

module.exports = { getStaff, addStaff, getStaffByID, deleteStaff };
