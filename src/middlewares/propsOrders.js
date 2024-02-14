function propsOrders(req, res, next) {
  const { user_id, product_id, quantity, state } = req.body;
  if (!user_id || !product_id || !quantity || !state) {
    const error = new Error(`Uid, Pid, Quantity and State are required`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsOrders;
