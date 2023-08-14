const newProductCreated = {
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: 4
}

const newProductCreatedReturn = {
  id: 4,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: 3,
}

const invalidNewProductCreated = {
  price: "30 peças de ouro",
  orderId: 4,
}

const allProductsReturn = [
  {
    name: "Martelo de Thor",
    price: "30 peças de ouro",
    orderId: 3,
  },
  {
    name: "Martelo de Thor",
    price: "30 peças de ouro",
    orderId: 3,
  },
  {
    name: "Martelo de Thor",
    price: "30 peças de ouro",
    orderId: 3,
  },
]

export default {
  newProductCreated,
  newProductCreatedReturn,
  allProductsReturn,
  invalidNewProductCreated,
}