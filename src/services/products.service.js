import { product } from "../data/mongo/manager.mongo.js";

class ProductsService {
  constructor() {
    this.model = product;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, options }) => await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const service = new ProductsService();
export default service;
