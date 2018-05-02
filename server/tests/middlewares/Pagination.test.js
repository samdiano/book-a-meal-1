import sinon from 'sinon';
import { assert, expect } from 'chai';
import mealsDB from '../../data/meals.json';
import Pagination from '../../src/middlewares/Pagination';

// mock server response
const res = {
  headersSent: false,
  status: status => ({
    send: message => ({ status, message })
  })
};
const status = sinon.spy(res, 'status');
const pagination = new Pagination('meals', mealsDB, 5, 2);

describe('Pagination Handler', () => {
  it('creates a new instance', () => {
    expect(pagination).to.be.instanceOf(Pagination);
    expect(pagination.type).to.equal('meals');
  });

  it('gets items per page when limit and page are set', () => {
    const pagesObj = pagination.getItemsForPage();

    expect(pagesObj).to.be.an('object');
    expect(pagesObj).to.include.keys('itemsByPage');
    expect(pagesObj).to.include.keys('metadata');
    expect(pagesObj.itemsByPage.length).to.equal(5);
    expect(pagesObj.metadata).to.deep.equal({
      totalCount: 10,
      itemsPerPage: 5,
      page: 2,
      prevPage: 1,
      nextPage: 2
    });
  });

  it('gets items per page with default limit and page when limit and page are not set', () => {
    const paginationDefault = new Pagination('meals', mealsDB);
    const pagesObj = paginationDefault.getItemsForPage();

    expect(pagesObj).to.be.an('object');
    expect(pagesObj).to.include.keys('itemsByPage');
    expect(pagesObj).to.include.keys('metadata');
    expect(pagesObj.itemsByPage.length).to.equal(5);
    expect(pagesObj.metadata).to.deep.equal({
      totalCount: 10,
      itemsPerPage: 5,
      page: 1,
      prevPage: 1,
      nextPage: 2
    });
  });

  it('sets currentPage to lastpage when current page is larger than total pages', () => {
    const paginationLarge = new Pagination('meals', mealsDB, 5, 3);
    const pagesObj = paginationLarge.getItemsForPage();

    expect(pagesObj.metadata.nextPage).to.equal(2);
  });

  it('sets currentPage to firstpage when current page is less than total pages', () => {
    const paginationLarge = new Pagination('meals', mealsDB, 5, 0.5);
    const pagesObj = paginationLarge.getItemsForPage();

    expect(pagesObj.metadata.prevPage).to.equal(1);
  });

  it('paginates and sends items', () => {
    pagination.paginateItems(res);

    assert(status.calledWith(200));
  });
});
