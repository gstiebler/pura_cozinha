
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
  usedIngredients: {
    ingredient: string;
    quantity: number;
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
    key: TOptionGroupKey;
    /** Key of the selected option item by the user */
    value: TSelectedItemKey;
    price: number;
    label: string;
  }[];
  selectedBoolOptions: {
    key: string;
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

export interface IUnit {
  unit: {
    _id: string;
  };
}

export interface IIngredientRequest {
  title: string;
  unit: string;
}

export interface IPurchaseRequest {
  value: number;
  quantity: number;
  buyDate: Date;
  ingredientType: string;
}


export interface IKitchenStockRequest {
  ingredientType: string;
  kitchen: string;
  quantity: number;
  updatedAt?: Date;
}

export interface ISelectedMenuItemOption {
  _id: TfmiId;
  qty: number;

  // Set of selected option keys
  boolOptions: Set<string>;
  // option key => option key string value
  multipleOptions: Map<TOptionGroupKey, string>;
}
