import { BookReduxDemoPage } from './app.po';

describe('book-redux-demo App', () => {
  let page: BookReduxDemoPage;

  beforeEach(() => {
    page = new BookReduxDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
