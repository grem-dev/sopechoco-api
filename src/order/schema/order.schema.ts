import { Document, Schema } from 'mongoose';
import { IOrderRepo } from '../interfaces/order.repo';

export type OrderDocument = IOrderRepo & Document;

export const OrderSchema = new Schema<OrderDocument>({
  _id: String,
  createdAt: String,
  status: String,
  items: [String],
  groups: [String],
});
