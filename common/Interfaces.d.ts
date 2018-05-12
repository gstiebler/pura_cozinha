
export type TfmiId = string;
export type TPaymentOptions = 'Dinheiro' | 'Cartão';
export type TOrderStatus = 'PENDING' | 'PREPARING' | 'DELIVERING' | 'DELIVERED' | 'CANCELED';
export type TOptionGroupKey = string;
export type TSelectedItemKey = string;

export interface IFoodMenuItem {
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

export interface ISelectedFoodMenuItem {
  _id?: TfmiId;
  title: string;
  description: string;
  price: number;
  imgURL: string;
  selectedOptions: {
    /** Key of the group of options */
    optionKey: TOptionGroupKey;
    /** Key of the selected option item by the user */
    selectedOptionItemKey: TSelectedItemKey;
    price: number;
    label: string;
  }[];
  selectedBoolOptions: {
    optionKey: string;
    price: number;
    label: string;
  }[];
}

export interface IOrderSummary {
  items: {
    fmi: ISelectedFoodMenuItem;
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
