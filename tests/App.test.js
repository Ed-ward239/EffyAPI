// index.test.js for backend API
const request = require("supertest");
const app = require("../App");
const sql = require('mssql');
require('dotenv').config();
// Database connection
const db=({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, 
    trustServerCertificate: true
  }
});

sql.connect(db)
  .then(pool => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });

test("Get CCL", async () => {
  const response = await request(app).get("/ccl_get");
  expect(response.status).toBe(200);
  expect(response.body).toEqual([
    {
      ship_name: "ALBATROSS",
      voyage_num: "AL20231002005",
      date: "2023-10-02T00:00:00.000Z",
      status_paid: "Unpaid",
      editor: "Edward",
      rev_ss: 17459,
      rev_cc: 23230,
      eu_vat: null,
      carnival_share: -15604.32,
      office_supp: null,
      discounts: 111.12,
      exec_folio: -111.12,
      ss_fee: -225,
      cc_fee: -511.06,
      meal_charge: -400,
      parole_fee: null,
      cash_adv: null,
      cash_paid: null,
      effy_share: 23980,
    },
    {
      ship_name: "APEX",
      voyage_num: "AP20271122005",
      date: "2027-11-22T00:00:00.000Z",
      status_paid: "Pending",
      editor: "Edward",
      rev_ss: 17888,
      rev_cc: 23288,
      eu_vat: null,
      carnival_share: -15688.32,
      office_supp: null,
      discounts: 188.12,
      exec_folio: -188.12,
      ss_fee: -228,
      cc_fee: -588.0599,
      meal_charge: -488,
      parole_fee: null,
      cash_adv: null,
      cash_paid: null,
      effy_share: 23988,
    },
    {
      ship_name: "APEX",
      voyage_num: "AP20480925005",
      date: "2048-09-25T00:00:00.000Z",
      status_paid: "Pending",
      editor: "Edward",
      rev_ss: 44365,
      rev_cc: null,
      eu_vat: null,
      carnival_share: -16858.7,
      office_supp: null,
      discounts: null,
      exec_folio: -189.85,
      ss_fee: -597.23,
      cc_fee: null,
      meal_charge: -440,
      parole_fee: -46,
      cash_adv: null,
      cash_paid: null,
      effy_share: 26233.22,
    },
  ]);
}, 20000);

app.listen(4000, () => {
  console.log('Server started on port 3000');
});
