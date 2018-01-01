import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
// Local Deps
import cms from '../../config/messages';

import Pagination from './Pagination';

describe('Components', () => {
  describe('Pagination', () => {
    const props = {
      totalItemsCount: 140,
      activePage: 11,
      onChange: () => {}
    };
    const noNextPageProps = {
      totalItemsCount: 140,
      activePage: 14,
      onChange: () => {}
    };
    const noPrevPageProps = {
      totalItemsCount: 140,
      activePage: 1,
      onChange: () => {}
    };

    it('renders the appropriate amount of Pages', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('Page')).to.have.length(6);
    });

    it('renders the next page link', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('.rvb-page--next').node.innerText).to.eql(cms['pagination.nextPage']);
    });

    it('does not render next page link on last page', () => {
      const wrapper = mount(<Pagination {...noNextPageProps} />);
      expect(wrapper.find('.rvb-page--next')).to.have.length(0);
    });

    it('renders the prev page link', () => {
      const wrapper = mount(<Pagination {...props} />);
      expect(wrapper.find('.rvb-page--prev').node.innerText).to.eql(cms['pagination.previousPage']);
    });

    it('does not render the prev page on first page', () => {
      const wrapper = mount(<Pagination {...noPrevPageProps} />);
      expect(wrapper.find('.rvb-page--prev')).to.have.length(0);
    });
  });
});
