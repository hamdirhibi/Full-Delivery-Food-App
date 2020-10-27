const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const { OrderValidation } = require("../validation");

//get one order
exports.Order_get_One = async (req, res) => {
  try {
    const order = await Order.findById({
      _id: req.params.orderId,
    });

    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
};

//getAll orders
exports.Order_findAll = async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
};

//getAll Order By id
exports.Order_by_ID = async (req, res) => {
  try {
    // console.log('request for Order !! ')
    const order = await Order.find({
      author: req.params.orderId,
    });

    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
};

//Create New order
exports.Order_save = async (req, res) => {
  const { error } = OrderValidation(res.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findById(req.body.author);
    if (!user) res.status(409).json({ message: "user not exist" });
    const date = new Date();
    const state = "onProgress";
    const order = new Order({
      author: user,
      products: req.body.products,
      quantities: req.body.quantities,
      createdAt: date,
      state: state,
      total: req.body.total,
      deleveryDate: req.body.deleveryDate,
      paymentMethod: req.body.paymentMethod,
      phone: req.body.phone,
      freeSpace: req.body.freeSpace,
      weight: req.body.weight,
      orderAddress: req.body.orderAddress,
    });
    const savedOrder = await Order.create(order).then(() => {
      console.log("Order created ");
    });
    res.status(200).json("order saved");
  } catch (err) {
    res.json({ message: err });
  }
};

//getAll onprogress order
exports.Order_OnPregress = async (req, res) => {
  try {
    const order = await Order.find({
      state: "onProgress",
    });

    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
};

//accepted order
exports.Order_Accepted = async (req, res) => {
  try {
    const order = await Order.findOne(
      {
        _id: req.params.orderId,
      },
      async function (err, rep) {
        if (rep.state != "onProgress")
          return res.status(409).send("order status must be onProgress");
        const updatedOrder = await Order.updateOne(
          { _id: req.params.orderId },
          {
            $set: {
              state: "accepted",
            },
          }
        );
        res.json(updatedOrder);
      }
    );
    //const res  = order.toObject({ getters: true }) ;
  } catch (err) {
    res.json({ message: err });
  }
};

//refused order
exports.Order_Refused = async (req, res) => {
  try {
    const order = await Order.findOne(
      {
        _id: req.params.orderId,
      },
      async function (err, rep) {
        if (rep.state != "onProgress")
          return res.status(409).send("order status must be onProgress");
        const updatedOrder = await Order.updateOne(
          { _id: req.params.orderId },
          {
            $set: {
              state: "refused",
            },
          }
        );
        res.json(updatedOrder);
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

//Confirmed order
exports.Order_Confirmed = async (req, res) => {
  try {
    const order = await Order.findOne(
      {
        _id: req.params.orderId,
      },
      async function (err, rep) {
        if (rep.state != "accepted")
          return res.status(409).send("order status must be Accepted");
        const updatedOrder = await Order.updateOne(
          { _id: req.params.orderId },
          {
            $set: {
              state: "confirmed",
            },
          }
        );
        res.json(updatedOrder);
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
};

/// view order
exports.Order_View = async (req, res) => {
  Order.findOneAndUpdate(
    {
      _id: req.params.orderId,
    },
    {
      view: true,
    },
    {
      returnOriginal: false,
    }
  )
    .then((order) => {
      return res.status(201).json(order);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};
