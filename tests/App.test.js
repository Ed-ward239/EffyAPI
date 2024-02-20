// index.test.js for backend API
const request = require("supertest");
const app = require("../App");
const sql = require('mssql');
require('dotenv').config();


test("Get CCL", async () => {
  const response = await request(app).get("/ccl_get");
  expect(response.status).toBe(200);
  expect(response.body).toEqual([{"carnival_share": -15688.32, "cash_adv": null, "cash_paid": null, "cc_fee": -588.0599, "date": "2027-11-22T00:00:00.000Z", "discounts": 188.12, "editor": "Edward", "effy_share": 23988, "eu_vat": null, "exec_folio": -188.12, "meal_charge": -488, "office_supp": null, "parole_fee": null, "rev_cc": 23288, "rev_ss": 17888, "ship_name": "APEX", "ss_fee": -228, "status_paid": "Pending", "voyage_num": "AP20271122005"}, {"carnival_share": -16858.7, "cash_adv": null, "cash_paid": null, "cc_fee": null, "date": "2048-09-25T00:00:00.000Z", "discounts": null, "editor": "Edward", "effy_share": 26233.22, "eu_vat": null, "exec_folio": -189.85, "meal_charge": -440, "office_supp": null, "parole_fee": -46, "rev_cc": null, "rev_ss": 44365, "ship_name": "APEX", "ss_fee": -597.23, "status_paid": "Pending", "voyage_num": "AP20480925005"}]);
}, 20000);

