import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import 'chromedriver';

export class CustomDriver {
  private readonly OPTION_ARGS = [
    '--window-size=1920,1080',
    '--disable-extensions',
    // '--headless', // Uncomment to run in container
  ];

  private driver!: WebDriver;
  private readonly PAGE_LOADING = 15_000;
  private readonly ELEMENT_DETECTION = 3_000;

  constructor() {
    this.driver = new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(new chrome.Options().addArguments(...this.OPTION_ARGS))
      .build();
    this.driver.manage().deleteAllCookies();
    this.driver.manage().setTimeouts({
      pageLoad: this.PAGE_LOADING,
      implicit: this.ELEMENT_DETECTION,
    });
  }

  public getDriver(): WebDriver {
    return this.driver;
  }

  public async navigateToUrl(url: string): Promise<void> {
    await this.driver.get(url);
  }

  public async quit(): Promise<void> {
    await this.driver.quit();
  }
}
