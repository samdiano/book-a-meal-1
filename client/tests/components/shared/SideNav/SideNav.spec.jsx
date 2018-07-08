import React from 'react';
import SideNav from '../../../../src/components/shared/SideNav/SideNav';
import { caterer } from '../../../setup/data';

describe('SideNav', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} open={false} logout={jest.fn()} active="dashboard" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when meals tab is active', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} open={false} logout={jest.fn()} active="meals" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when menu tab is active', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} open={false} logout={jest.fn()} active="menu" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when orders tab is active', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} open={false} logout={jest.fn()} active="orders" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('toggles sidenav and handles link click when dashboard link is clicked', () => {
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    const wrapper = mount(<SideNav user={caterer} logout={jest.fn()} open active="orders" toggleSideNav={toggleSideNavMock} push={pushMock} />, rrcMock.get());

    wrapper.find('div.sidenav-body>Link>button').at(0).simulate('click');
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('toggles sidenav and handles link click when meals link is clicked', () => {
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    const wrapper = mount(<SideNav user={caterer} logout={jest.fn()} open active="orders" toggleSideNav={toggleSideNavMock} push={pushMock} />, rrcMock.get());

    wrapper.find('div.sidenav-body>Link>button').at(1).simulate('click');
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/meals');
  });

  it('toggles sidenav and handles link click when menu link is clicked', () => {
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    const wrapper = mount(<SideNav user={caterer} logout={jest.fn()} open active="orders" toggleSideNav={toggleSideNavMock} push={pushMock} />, rrcMock.get());

    wrapper.find('div.sidenav-body>Link>button').at(2).simulate('click');
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/menu');
  });

  it('toggles sidenav and handles link click when orders link is clicked', () => {
    const toggleSideNavMock = jest.fn();
    const pushMock = jest.fn();

    const wrapper = mount(<SideNav user={caterer} logout={jest.fn()} open active="menu" toggleSideNav={toggleSideNavMock} push={pushMock} />, rrcMock.get());

    wrapper.find('div.sidenav-body>Link>button').at(3).simulate('click');
    expect(toggleSideNavMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/orders');
  });

  it('closes SideNav when open and close icon is clicked', () => {
    const toggleSideNavMock = jest.fn();
    const wrapper = mount(<SideNav user={caterer} logout={jest.fn()} open active="orders" toggleSideNav={toggleSideNavMock} />, rrcMock.get());

    wrapper.find('div.d-none-md>Link>button').simulate('click');
    expect(toggleSideNavMock).toHaveBeenCalled();
  });
});
