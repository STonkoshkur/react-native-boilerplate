describe('SignUp flow', () => {
  const email = `e2e.user.${Date.now()}@example.com`;
  const password = 'secret';
  const firstName = 'E2e';
  const lastName = `User${Date.now()}`;

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should sign up successfully', async () => {
    await element(by.id('signUpButtonScreen')).tap();
    await waitFor(element(by.id('signUpEmail')))
      .toBeVisible()
      .withTimeout(2000);

    await waitFor(element(by.id('signUpPassword')))
      .toBeVisible()
      .whileElement(by.id('signUpScroll'))
      .scroll(100, 'down');
    await element(by.id('signUpPassword')).typeText(password);

    await waitFor(element(by.id('signUpEmail')))
      .toBeVisible()
      .whileElement(by.id('signUpScroll'))
      .scroll(100, 'up');
    await element(by.id('signUpEmail')).typeText(email);

    await waitFor(element(by.id('signUpFirstName')))
      .toBeVisible()
      .whileElement(by.id('signUpScroll'))
      .scroll(100, 'down');
    await element(by.id('signUpFirstName')).typeText(firstName);

    await waitFor(element(by.id('signUpLastName')))
      .toBeVisible()
      .whileElement(by.id('signUpScroll'))
      .scroll(100, 'down');
    await element(by.id('signUpLastName')).typeText(lastName);

    await waitFor(element(by.id('signUpButton')))
      .toBeVisible()
      .whileElement(by.id('signUpScroll'))
      .scroll(100, 'down');
    await element(by.id('signUpButton')).tap();

    await expect(element(by.text('Welcome!'))).toBeVisible();
  });
});
