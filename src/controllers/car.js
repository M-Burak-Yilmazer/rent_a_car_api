"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Car Controller:

const Car = require("../models/car");
const Reservation = require("../models/reservation");

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
    // const cars = await Car.find();
    let customFilter = { isAvailable: true };

    const { startDate: getStartDate, endDate: getEndDate } = req.query;
    if (getStartDate && getEndDate) {
      const reservedCars = await Reservation.find({
        $nor: [
          { startDate: { $gt: getEndDate } },
          { endDate: { $lt: getStartDate } },
        ],
      }, {_id:0,  carId: 1 }).distinct("carId")
      console.log(reservedCars) 
      customFilter._id= { $nin: reservedCars }// reserve edilmiş araçlar dönüyor bize
    } else {
      throw new Error("stardate and enddate must be ");
    }

    const data = await res.getModelList(Car, customFilter, [
      { path: "createdId", select: "username" },
      { path: "updatedId", select: "username" },
    ]);

    res.status(200).send({
      error: false,
      message: "All Cars",
      data,
      details: await res.getModelListDetails(Car),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Car'
                }
            }
        */
    req.body.createdId = req.user._id;
    req.body.updatedId = req.user._id;
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
    const car = await Car.findOne({ _id: req.params.id }).populate([
      { path: "createdId", select: "username" },
      { path: "updatedId", select: "username" },
    ]);
    res.status(200).send({
      error: false,
      data: car,
    });
  },
  update: async (req, res) => {
    /*
     #swagger.tags = ["Car"]
     #swagger.summary = "Update Car"  
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Car'
                }
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
