import React from 'react';
import App from '../../../src/components/App';

describe('App', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<App />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
