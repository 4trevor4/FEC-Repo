import React from 'react';
import { shallow } from 'enzyme';
import ImageModal from './ImageModal.jsx';

test('<ImageModal /> has image container', () => {
  const wrapper = shallow(<ImageModal source="https://abc.com"/>);
  expect(wrapper.find('.image-modal-container')).toHaveLength(1);
});

test('<ImageModal /> container has two children', () => {
  const wrapper = shallow(<ImageModal source="https://abc.com"/>);
  expect(wrapper.find('.image-modal-container').children()).toHaveLength(2);
});

