const orderList = [
  {
    "id": 1,
    "userId": 1,
    "productIds": [
      2,
      1
    ]
  },
  {
    "id": 2,
    "userId": 3,
    "productIds": [
      4,
      3
    ]
  },
  {
    "id": 3,
    "userId": 2,
    "productIds": [
      5
    ]
  }
];

const oneOrder = {
  id: 3,
  userId: 2,
}

const newOrder = {
  userId: 1,
  productIds: [4, 1],
}

const invalidNewOrder = {
  productIds: [4, 1],
}

const notFoundUserIdNewOrder = {
  userId: 0,
  productIds: [4, 1],
}

const newOrderCreated = {
  userId: 3,
  id: 10,
}

export default {
  orderList,
  oneOrder,
  newOrder,
  newOrderCreated,
  invalidNewOrder,
  notFoundUserIdNewOrder,
}