import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import MockAdapter from 'axios-mock-adapter';
import instance from '../../../src/config/axios';
import operations from '../../../src/store/operations/orders';
import { deliverOrder as deliverOrderData, caterersOrdersObj, caterersOrdersObjPerDay } from '../../setup/data';

const {
  fetchOrders,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  deliverOrder,
  setDelivering,
  unsetDelivering,
  deliverOrderSuccess,
  deliverOrderFailure,
} = operations;

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// configure Mock store
const store = mockStore({
  items: [],
  pendingOrders: 0,
  totalCashEarned: 0,
  error: null
});

describe('Orders Actions', () => {
  test('fetchOrdersSuccess', () => {
    const action = fetchOrdersSuccess('RECEIVE_CATERERS_ORDERS_SUCCESS', caterersOrdersObj);

    expect(action).toEqual({
      type: 'RECEIVE_CATERERS_ORDERS_SUCCESS',
      payload: caterersOrdersObj
    });
  });

  test('fetchOrdersFailure', () => {
    const action = fetchOrdersFailure('RECEIVE_CATERERS_ORDERS_FAILURE', 'error');

    expect(action).toEqual({
      type: 'RECEIVE_CATERERS_ORDERS_FAILURE',
      payload: 'error'
    });
  });

  test('setDelivering', () => {
    const action = setDelivering();

    expect(action).toEqual({ type: 'SET_DELIVERING' });
  });

  test('unsetDelivering', () => {
    const action = unsetDelivering();

    expect(action).toEqual({ type: 'UNSET_DELIVERING' });
  });

  test('deliverOrderSuccess', () => {
    const action = deliverOrderSuccess(deliverOrderData);

    expect(action).toEqual({ type: 'DELIVER_ORDER_SUCCESS', payload: deliverOrderData });
  });

  test('deliverOrderFailure', () => {
    const action = deliverOrderFailure('error');

    expect(action).toEqual({
      type: 'DELIVER_ORDER_FAILURE',
      payload: 'error'
    });
  });

  describe('Orders Operations', () => {
    afterEach(() => {
      store.clearActions();
    });

    describe('Orders', () => {
      beforeEach(() => {
        moxios.install(instance);
      });

      afterEach(() => {
        moxios.uninstall(instance);
      });

      it('dispatches SET_FETCHING, RECEIVE_CATERERS_ORDERS_SUCCESS and UNSET_FETCHING on successful fetching of caterer orders', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_CATERERS_ORDERS_SUCCESS', 'UNSET_FETCHING'];

        moxios.stubRequest(`${url}/orders`, {
          status: 200,
          response: caterersOrdersObj
        });

        return store.dispatch(fetchOrders('caterer')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_CATERERS_ORDERS_SUCCESS and UNSET_FETCHING when date is given', () => {
        moxios.uninstall(instance);

        const expectedActions = ['SET_FETCHING', 'RECEIVE_CATERERS_ORDERS_SUCCESS', 'UNSET_FETCHING'];
        const mock = new MockAdapter(instance);

        mock.onGet(`${url}/orders?date=2018-05-27`).reply(200, caterersOrdersObjPerDay);

        return store.dispatch(fetchOrders('caterer', '2018-05-27')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_CATERERS_ORDERS_FAILURE and UNSET_FETCHING on unsuccessful fetching', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_CATERERS_ORDERS_FAILURE', 'UNSET_FETCHING'];

        moxios.stubRequest(`${url}/orders`, {
          status: 401,
          response: {
            error: 'Error'
          },
        }, 5);

        return store.dispatch(fetchOrders('caterer')).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_DELIVERING, DELIVER_ORDER_SUCCESS and UNSET_DELIVERING on successful order delivery', () => {
        const expectedActions = ['SET_DELIVERING', 'DELIVER_ORDER_SUCCESS', 'UNSET_DELIVERING'];

        moxios.stubRequest(`${url}/orders/fb097bde-5959-45ff-8e21-51184fa60c26/deliver`, {
          status: 200,
          response: deliverOrderData
        });

        return store.dispatch(deliverOrder('fb097bde-5959-45ff-8e21-51184fa60c26')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_DELIVERING, DELIVER_ORDER_FAILURE and UNSET_DELIVERING on successful order delivery', () => {
        const expectedActions = ['SET_DELIVERING', 'DELIVER_ORDER_FAILURE', 'UNSET_DELIVERING'];

        moxios.stubRequest(`${url}/orders/fb097bde-5959-45ff-8e21-51184fa60c26/deliver`, {
          status: 401,
          response: {
            error: 'An Error'
          }
        });

        return store.dispatch(deliverOrder('fb097bde-5959-45ff-8e21-51184fa60c26')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});