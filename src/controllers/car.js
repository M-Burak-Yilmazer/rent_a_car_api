"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Car Controller:

const Car = require("../models/car");

/* ------------------------------------------------------- */

module.exports = {
  list: async (req, res) => {
    /*

#swagger.tags = ["Car"]
#swagger.summary = "Get All Cars"
#swagger.description =` 
 You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>

`,


*/
    const cars = await Car.find();
    res.status(200).send({
      error: false,
      message: "All Cars",
      data: cars,
    });
  },
  create: async (req, res) => {
    /* 
                    #swagger.tags = ["Car"]
                    #swagger.summary = "Create Car"
                    #swagger.parameters["body"] = {
                    in:"body",
                    required: true,
                    schema: {
                        "plateNumber": "34ABC345",
                        "brand": "Opel",
                        "model": "Astra",
                        "year": 2021,
                        "isAutomatic": false,
                        "pricePerDay": 189.99,
                        "isPublish": false
                    }
                    }   

*/

    const car = await Car.create(req.body);
    res.status(201).send({
      error: false,
      message: "Car Created",
      data: car,
    });
  },
  read: async (req, res) => {
    /*
      #swagger.tags = ["Car"]
      #swagger.summary = "Get Single Car"
     */
    const car = await Car.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data: car,
    });
  },
  update: async (req, res) => {
    /*
     #swagger.tags = ["Car"]
     #swagger.summary = "Update Car"
     #swagger.parameters["body"] = {
     in:"body",
     required: true,
     schema: {
         "plateNumber": "34ABC345", 
         "brand": "Opel",
         "model": "Astra",
         "year": 2021,
         "isAutomatic": false,
         "pricePerDay": 189.99,
         "isPublish": false

     }
     
     }
     */
    const data = await Car.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Car.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
     #swagger.tags = ["Car"]
     #swagger.summary = "Delete Car"
     */
    const data = await Car.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !deletedCount,
      data,
    });
  },
};
