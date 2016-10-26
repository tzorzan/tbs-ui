import { TbsUiPage } from './app.po';

describe('tbs-ui App', function() {
  let page: TbsUiPage;

  beforeEach(() => {
    page = new TbsUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
