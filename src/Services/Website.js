import { PRODUCT_LIST, ITEM } from "../Constants/Api";
import { GetAPIRequest } from "./RestAPI";
const getAllProducts = () => {
  return GetAPIRequest({ url: PRODUCT_LIST });
};
const singleProduct = (id) => {
  return GetAPIRequest({ url: ITEM + id });
};
export const websiteServices = { getAllProducts, singleProduct };
