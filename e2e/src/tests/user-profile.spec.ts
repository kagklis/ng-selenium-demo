import { expect } from 'chai';
import { CustomDriver } from '../common/custom-driver';
import { UserProfilePage } from '../pages/user-profile.page';

describe('UserProfile', function () {
  this.timeout(0);
  const firstName = 'Joe';
  const lastName = 'Doe';

  let customDriver: CustomDriver;
  let userProfilePage: UserProfilePage;

  before(async function () {
    customDriver = new CustomDriver();
  });

  beforeEach(async function () {
    userProfilePage = new UserProfilePage(customDriver.getDriver());
    await customDriver.navigateToUrl('http://localhost:4200');
  });

  after(async function() {
    customDriver.quit();
  });

  it('should successfully save a user manually', async function () {
    // Arrange
    await userProfilePage.fillUserForm(firstName, lastName);

    // Act
    await userProfilePage.saveUser();

    // Assert
    const logs = await userProfilePage.getLoggingHistory();
    expect(logs.length).to.equal(1);
    expect(logs[0]).to.contain(firstName + ' ' + lastName);
  });

  it('should successfully auto-save a user', async function () {
    // Arrange
    await userProfilePage.toggleAutoSave();

    // Act
    await userProfilePage.fillUserForm(firstName, lastName);

    // Assert
    expect(await userProfilePage.isLoadingBarVisible()).to.be.true;
    const logs = await userProfilePage.getLoggingHistory();
    expect(logs.length).to.equal(1);
    expect(logs[0]).to.contain(firstName + ' ' + lastName);
  });

  it('should successfully clear the logging history', async function () {
    // Arrange
    await userProfilePage.fillUserForm(firstName, lastName);
    await userProfilePage.saveUser();

    // Act
    await userProfilePage.clearLoggingHistory();

    // Assert
    expect(await userProfilePage.hasLoggingHistory()).to.be.false;
  });
});
