
export type TfmiId = string;

export interface FoodMenuItem {
  _id?: TfmiId;
  title: string;
  description: string;
  price: number;
  imgURL: string;
}

export interface IOrderSummary {
  items: {
    fmi: FoodMenuItem;
    qty: number;
    itemTotalPrice: number;
  }[];
  totalAmount: number;
}

export interface IOrderRequest extends IOrderSummary {
  selectedLocal: string;
  selectedPaymentOption: string;
  telephoneNumber: string;
}
