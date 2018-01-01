import {
        GET_CATEGORIES_SUCCESS,
        GET_CATEGORIES_FAIL,
      } from '../constants/actions';
import { handleErrors } from '../utils/requestUtils';
import { getCategoriesRequest } from '../api/categoriesApi';

/*-----------------------------------
  GET CATEGORIES
-------------------------------------*/
export function getCategoriesSuccess(categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    categories
  };
}

export function getCategoriesFail(error) {
  return {
    type: GET_CATEGORIES_FAIL,
    error
  };
}

export const getCategories = () => async (dispatch) => {
  try {
    // Make Api Request
    const response = await getCategoriesRequest();

    handleErrors(response);
    const json = await response.json();

    const { categories } = json;
    dispatch(getCategoriesSuccess(categories));
  }
  catch (err) {
    dispatch(getCategoriesFail(err));
  }
};
