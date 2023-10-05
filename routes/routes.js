module.exports = app => {
    const dataTable = require("../Controllers/Controllers.js");
    var router = require(express).Router();

    // Create a new row of data
    router.post("/create", dataTable.create);

    // Retrieve all data
    router.get("/", dataTable.findAllData);

    // Retrieve all
    //router.get("/findAllData", dataTable.findAllData);

    // Retrieve a single data with id
    //router.get("/:id", dataTable.findOne);

    // Update data with id
    router.put("/update", dataTable.update);

    // Delete a data with id
    router.delete("/delete", dataTable.delete);

    // Delet all data
    router.delete("/deleteAll", dataTable.deleteAll);

    app.use('/api/dataTable', router);
};