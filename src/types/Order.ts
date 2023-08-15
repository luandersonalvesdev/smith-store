export type Order = {
  id: number;
  userId: number;
  productIds?: number[];
};

export type NewOrder = {
  userId: number,
  productIds: number[],
};