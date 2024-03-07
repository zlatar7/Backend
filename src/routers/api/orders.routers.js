import { Router } from "express";
import { Types } from "mongoose";
// import order from "../../data/fs/orders.fs.js";
import { order } from "../../data/mongo/manager.mongo.js";
import propsOrders from "../../middlewares/propsOrders.js";
import propsOrdersUpdate from "../../middlewares/propsOrdersUpdate.js";
import CustomRouter from "../CustomRouter.js";

export default class OrderRouter extends CustomRouter {
  init() {
    this.read("/total/:uid", ["USER"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const isValidID = Types.ObjectId.isValid(uid);

        if (isValidID) {
          const reportBill = await order.report(uid);

          return res.success200(reportBill);
        } else {
          res.error404();
        }
      } catch (error) {
        return next(error);
      }
    });

    this.read("/", ["ADMIN"], async (req, res, next) => {
      try {
        const orderAndPaginate = {
          limit: req.query.limit || 20,
          page: req.query.page || 1,
          sort: { name: "asc" },
        };
        const filter = {};
        const orders = await order.read({ filter, orderAndPaginate });

        if (orders.totalPages > 0) {
          return res.success200(orders);
        } else {
          return res.error404();
        }
      } catch (error) {
        next(error);
      }
    });

    this.read("/:oid", ["USER"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const isValidID = Types.ObjectId.isValid(oid);

        if (isValidID) {
          const obj = await order.readOne(oid);

          return res.success200(obj);
        } else {
          res.error404();
        }
      } catch (error) {
        next(error);
      }
    });

    this.create("/", ["USER"], propsOrders, async (req, res, next) => {
      try {
        const object = req.body;
        const obj = await order.create(object);
        return res.success201(obj);
      } catch (error) {
        return next(error);
      }
    });

    this.update(
      "/:oid",
      ["USER"],
      propsOrdersUpdate,
      async (req, res, next) => {
        try {
          const { oid } = req.params;
          const data = req.body;
          const isValidID = Types.ObjectId.isValid(oid);

          if (isValidID) {
            const one = await order.update(oid, data);
            return res.success200(one);
          } else {
            res.error404();
          }
        } catch (error) {
          next(error);
        }
      }
    );

    this.destroy("/:oid", ["USER"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const isValidID = Types.ObjectId.isValid(oid);

        if (isValidID) {
          const one = await order.destroy(oid);
          return res.success200(one);
        } else {
          res.error404();
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
