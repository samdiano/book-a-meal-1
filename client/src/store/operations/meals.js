import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import {
  setMealWorking, unsetMealWorking, fetchMealsSuccess, fetchMealsFailure,
  clearMealError, addMealSuccess, addMealFailure, editMealSuccess, editMealFailure,
  deleteMealSuccess, deleteMealFailure
} from '../actions/meals';
import { toggleModal } from '../actions/ui';

const fetchMeals = () => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get('/meals');

    dispatch(fetchMealsSuccess(response.data.meals));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchMealsFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};

const addMeal = meal => async (dispatch) => {
  try {
    dispatch(setMealWorking());

    const response = await instance.post('/meals', meal);

    dispatch(addMealSuccess(response.data));
    dispatch(unsetMealWorking());
    dispatch(toggleModal());
    dispatch(toggleModal('newMealImage'));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(addMealFailure(errorResponse.response));
    dispatch(unsetMealWorking());
  }
};

const editMeal = (id, updatedMeal, toggleModalOnEdit) => async (dispatch) => {
  try {
    dispatch(setMealWorking());

    const response = await instance.put(`/meals/${id}`, updatedMeal);

    dispatch(editMealSuccess(response.data));
    dispatch(unsetMealWorking());
    if (toggleModalOnEdit) dispatch(toggleModal());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(editMealFailure(errorResponse.response));
    dispatch(unsetMealWorking());
  }
};

const deleteMeal = id => async (dispatch) => {
  try {
    dispatch(setMealWorking());

    await instance.delete(`/meals/${id}`);

    dispatch(deleteMealSuccess(id));
    dispatch(unsetMealWorking());
    dispatch(toggleModal());
    dispatch(toggleModal('deleteSuccessMsg'));
    setTimeout(() => {
      dispatch(toggleModal());
    }, 500);
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(deleteMealFailure(errorResponse.response));
    dispatch(unsetMealWorking());
  }
};

export default {
  addMeal,
  editMeal,
  fetchMeals,
  deleteMeal,
  clearMealError,
  addMealSuccess,
  addMealFailure,
  editMealSuccess,
  editMealFailure,
  deleteMealSuccess,
  deleteMealFailure,
  setMealWorking,
  unsetMealWorking,
  fetchMealsSuccess,
  fetchMealsFailure,
};
