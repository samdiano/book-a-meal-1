import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState, mealsObj, metadata } from '../../../setup/mockData';
import MenuFormComponent from '../../../../src/components/shared/Form/MenuForm';
import MenuFormContainer from '../../../../src/containers/shared/Form/MenuForm';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

const props = {
  meals: mealsObj.meals,
  menu: {
    id: '1234',
    date: '2018-06-16',
    meals: [mealsObj.meals[0]],
  },
  isFetching: false,
  fetchMeals: jest.fn(),
  fetchMenu: jest.fn(),
  clearMenuError: jest.fn(),
  addMenu: jest.fn(),
  editMenu: jest.fn(),
  submitting: false,
  submitError: null,
  menuMetadata: metadata,
  mealsMetadata: metadata
};

const { now } = Date;

describe('MenuForm', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    jest.clearAllMocks();
    Date.now = now;
  });

  it('renders correctly', () => {
    const wrapper = shallow(<MenuFormComponent {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    const wrapper = shallow(<MenuFormComponent {...props} isFetching />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when submitting', () => {
    const wrapper = shallow(<MenuFormComponent {...props} submitting />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when there is a submit error', () => {
    const wrapper = shallow(<MenuFormComponent {...props} submitError="Error" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when there is a date error', () => {
    const errorObj = { date: { value: 'Error' } };
    const wrapper = shallow(<MenuFormComponent {...props} submitError={errorObj} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly when there are no meals', () => {
    const wrapper = shallow(<MenuFormComponent {...props} meals={[]} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('adds meal to state on meal select', () => {
    const wrapper = mount(<MenuFormComponent {...props} />);
    const event = { target: { name: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3', type: 'checkbox', checked: true } };

    wrapper.find('input[name="36d525d1-efc9-4b75-9999-3e3d8dc64ce3"]').simulate('change', event);

    const mealAvailInState = wrapper.state().meals.findIndex(meal => meal === '36d525d1-efc9-4b75-9999-3e3d8dc64ce3');

    expect(mealAvailInState).toEqual(1);
  });

  it('removes meal from state on meal deselect', () => {
    const wrapper = mount(<MenuFormComponent {...props} />);
    const falseEvent = { target: { name: '81211c24-51c0-46ec-b1e0-18db55880958', type: 'checkbox', checked: false } };

    wrapper.find('input[name="81211c24-51c0-46ec-b1e0-18db55880958"]').simulate('change', falseEvent);

    const mealAvailInState = wrapper.state().meals.findIndex(meal => meal === '81211c24-51c0-46ec-b1e0-18db55880958');

    expect(mealAvailInState).toEqual(-1);
  });

  it('changes date state on date change', () => {
    // Date.now() =
    const wrapper = mount(<MenuFormComponent {...props} />);
    const event = { target: { value: '2018-04-27' } };

    wrapper.find('input').at(0).simulate('change', event);

    expect(wrapper.state().date).toEqual('2018-04-27');
  });

  it('does not changes date state on date change when date is lower than current date', () => {
    const wrapper = mount(<MenuFormComponent {...props} />);
    const event = { target: { value: '1969-01-01' } };

    wrapper.find('input').at(0).simulate('change', event);

    expect(wrapper.state().date).toEqual('1970-01-01');
  });

  it('submits Menu Form when adding menu', () => {
    const menu = { id: null, date: '2018-06-16', meals: [] };
    const addMenuMock = jest.fn();
    const wrapper = mount(<MenuFormComponent {...props} menu={menu} addMenu={addMenuMock} />);

    wrapper.setState({ meals: mealsObj.meals });

    wrapper.find('button').simulate('click');

    expect(addMenuMock).toHaveBeenCalled();
  });

  it('submits Menu Form when editing', () => {
    const editMenuMock = jest.fn();
    const wrapper = mount(<MenuFormComponent {...props} editMenu={editMenuMock} />);

    wrapper.find('button').simulate('click');

    expect(editMenuMock).toHaveBeenCalled();
  });

  it('does not submit Menu Form when meal state is empty', () => {
    const menu = { id: null, date: '2018-06-16', meals: [] };
    const addMenuMock = jest.fn();
    const wrapper = mount(<MenuFormComponent {...props} menu={menu} addMenu={addMenuMock} />);

    wrapper.find('button').simulate('click');

    expect(addMenuMock).not.toHaveBeenCalled();
    expect(wrapper.find('p.danger')).toBeTruthy();
  });

  it('renders connected component correctly', () => {
    const wrapper = mount(<Provider store={store}><MenuFormContainer {...props} /></Provider>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls fetchMeals when fetchMoreData is called and meals metadata has next url', () => {
    const fetchMealsMock = jest.fn();

    const wrapper = mount(<MenuFormComponent
      {...props}
      fetchMeals={fetchMealsMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMealsMock).toHaveBeenCalledTimes(2);
  });

  it('doesnt call fetchMeals again when fetchMoreData is called and meals metadata does not have next url', () => {
    const fetchMealsMock = jest.fn();

    const wrapper = mount(<MenuFormComponent
      {...props}
      mealsMetadata={{}}
      fetchMeals={fetchMealsMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMealsMock).toHaveBeenCalledTimes(1);
  });

  it('calls fetchMenu when fetchMoreData is called and menu metadata has next url', () => {
    const fetchMenuMock = jest.fn();

    const wrapper = mount(<MenuFormComponent
      {...props}
      fetchMenu={fetchMenuMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMenuMock).toHaveBeenCalledTimes(2);
  });

  it('does not call fetchMenu again when fetchMoreData is called and menu metadata does not have next url', () => {
    const fetchMenuMock = jest.fn();

    const wrapper = mount(<MenuFormComponent
      {...props}
      menuMetadata={{}}
      fetchMenu={fetchMenuMock}
    />);

    wrapper.instance().fetchMoreData();

    expect(fetchMenuMock).toHaveBeenCalledTimes(1);
  });

  it('renders connected component correctly', () => {
    const fetchMenuMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <MenuFormContainer
          {...props}
          menuMetadata={{}}
          fetchMenu={fetchMenuMock}
        />
      </Provider>);

    const wrapper = mount(comp);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
