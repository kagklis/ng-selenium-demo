import { By, WebDriver } from 'selenium-webdriver';

export class UserProfilePage {
  // Element locators
  private autoSaveLocator: By = By.id('autosave');
  private firstNameInputLocator: By = By.id('first-name-input');
  private lastNameInputLocator: By = By.id('last-name-input');
  private saveBtnLocator: By = By.id('save-btn');
  private loadingBarLocator: By = By.id('loading-bar');
  private loggingHistoryPanelLocator: By = By.id('logging-history-panel');
  private historyLogLocator: By = By.css('p[data-test="history-log"');
  private clearHistoryBtnLocator: By = By.id('clear-history-btn');

  constructor(private driver: WebDriver) {}

  public async fillUserForm(
    firstName: string,
    lastName: string
  ): Promise<void> {
    await this.driver
      .findElement(this.firstNameInputLocator)
      .sendKeys(firstName);
    await this.driver.findElement(this.lastNameInputLocator).sendKeys(lastName);
  }

  public async saveUser(): Promise<void> {
    await this.driver.findElement(this.saveBtnLocator).click();
  }

  public async toggleAutoSave(): Promise<void> {
    await this.driver.findElement(this.autoSaveLocator).click();
  }

  public async isLoadingBarVisible(): Promise<boolean> {
    try {
      await this.driver.findElement(this.loadingBarLocator);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async hasLoggingHistory(): Promise<boolean> {
    try {
      await this.driver.findElement(this.loggingHistoryPanelLocator);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getLoggingHistory(): Promise<string[]> {
    const logElements = await this.driver.findElements(this.historyLogLocator);
    return Promise.all(
      logElements.map(async (element) => await element.getText())
    );
  }

  public async clearLoggingHistory(): Promise<void> {
    await this.driver.findElement(this.clearHistoryBtnLocator).click();
  }
}
