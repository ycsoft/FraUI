import { UnitPage } from './app.po';

describe('unit App', () => {
  let page: UnitPage;

  beforeEach(() => {
    page = new UnitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
