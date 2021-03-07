describe('Sign in flow', () => {
  const email = `john.doe@example.com`;
  const password = 'secret';

  beforeEach(async () => {
    await device.launchApp();
  });
  it('should sign in successfully', async () => {
    await waitFor(element(by.id('signInPassword')))
      .toBeVisible()
      .whileElement(by.id('signInScroll'))
      .scroll(20, 'down');
    await element(by.id('signInPassword')).typeText(password);

    await waitFor(element(by.id('signInEmail')))
      .toBeVisible()
      .whileElement(by.id('signInScroll'))
      .scroll(20, 'up');
    await element(by.id('signInEmail')).typeText(email);

    await waitFor(element(by.id('signInButton')))
      .toBeVisible()
      .whileElement(by.id('signInScroll'))
      .scroll(20, 'down');
    await element(by.id('signInButton')).tap();

    await expect(element(by.text('Welcome!'))).toBeVisible();
  });
  it('social auth buttons should be shown', async () => {
    await waitFor(element(by.id('googleSignInButton'))).toBeVisible();
    await waitFor(element(by.id('facebookSignInButton'))).toBeVisible();
    await waitFor(element(by.id('appleSignInButton'))).toBeVisible();
  });
});
