import { MlbWebAppPage } from './app.po';

describe('mlb-web-app App', () => {
  let page: MlbWebAppPage;

  beforeEach(() => {
    page = new MlbWebAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
