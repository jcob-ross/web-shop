import { OrderLine } from './OrderLine';

export class ProductOrder {
  id: number;
  dateCreated: Date;
  acceptedOn: Date;
  shippedOn: Date;
  cancelledOn: Date;
  deliveredOn: Date;
  orderLines: OrderLine[];
}
