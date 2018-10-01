import * as empty from "./isEmpty";
import { IIngredientRequest } from "../../../../common/Interfaces";
const Validator = require("validator");

export function validateIngredientTypeInput(request: IIngredientRequest) {
  let errors = {};

  request.title = !empty.isEmpty(request.title) ? request.title : "";
  

  if (!Validator.isLength(request.title, {min: 3, max: 50})) {
    errors["title"] = "O campo Nome do insumo deve conter entre 3 e 50 caractéres";
  }

  if (Validator.isEmpty(request.title)) {
    errors["title"] = "O campo Nome do insumo é obrigatório";
  }

  return {
    errors: errors,
    isValid: empty.isEmpty(errors)
  };
}


export function validatePurchaseInput(request) {
  let errors = {};
  console.log(request.buyDate);
  request.buyDate = !empty.isEmpty(request.buyDate) ? request.buyDate : "";
  console.log(typeof request.quantity);
  request.quantity = !empty.isEmpty(request.quantity) ? request.quantity : "";
  request.value = !empty.isEmpty(request.value) ? request.value : "";
  
  if (!Validator.isDecimal(request.quantity+"")) {
    errors["quantity"] = "O campo Quantidade aceita apenas números";
  }

  if (!Validator.isDecimal(request.value+"")) {
    errors["value"] = "O campo Valor deve ser um valor válido de dinheiro";
  }

  if (Validator.isEmpty(request.buyDate)) {
    errors["buyDate"] = "O campo Data de Compra é obrigatório";
  }

  if (Validator.isEmpty(request.quantity+"")) {
    errors["quantity"] = "O campo Quantidade é obrigatório";
  }

  if (Validator.isEmpty(request.value+"")) {
    errors["value"] = "O campo Valor é obrigatório";
  }
  return {
    errors: errors,
    isValid: empty.isEmpty(errors)
  };
}
