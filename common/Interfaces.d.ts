
export type TfmiId = string;
export type TPaymentOptions = 'Dinheiro' | 'Cartão';
export type TOrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELED';

export interface FoodMenuItem {
  _id?: TfmiId;
  title: string;
  description: string;
  price: number;
  imgURL: string;
  options: {
    label: string;
    key: string;
    optionItems: {
      label: string;
      key: string;
      price: number;
    }[];
  }[];
  boolOptions: {
    label: string;
    key: string;
    price: number;
  }[];
}

export interface SelectedFoodMenuItem {
  _id?: TfmiId;
  title: string;
  description: string;
  price: number;
  imgURL: string;
  selectedOptions: {
    optionKey: string;
    selectedOptionItemKey: string;
  }[];
  selectedBoolOptions: {
    optionKey: string;
    value: boolean;
  }[];
}

export interface IOrderSummary {
  items: {
    fmi: SelectedFoodMenuItem;
    qty: number;
    itemTotalPrice: number;
  }[];
  totalAmount: number;
}

export interface IOrderRequest {
  orderSummary: IOrderSummary;
  local: string;
  localComplement: string;
  paymentOption: TPaymentOptions;
  telephoneNumber: string;
  comments: string;
  kitchenComments: string;
}

export interface ISelectedMenuItemOption {
  _id: TfmiId;
  optionKey: string;
  selectedItem: string;
}
