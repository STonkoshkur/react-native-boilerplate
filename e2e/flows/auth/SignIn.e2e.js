describe('SignIn flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should sign in successfully', async () => {
    await waitFor(element(by.id('signInPassword')))
      .toBeVisible()
      .whileElement(by.id('signInScroll'))
      .scroll(100, 'down');
    await element(by.id('signInPassword')).typeText('secret');

    await waitFor(element(by.id('signInEmail')))
      .toBeVisible()
      .whileElement(by.id('signInScroll'))
      .scroll(100, 'up');
    await element(by.id('signInEmail')).typeText('john.doe@example.com');

    await waitFor(element(by.id('signInButton')))
      .toBeVisible()
      .whileElement(by.id('signInScroll'))
      .scroll(100, 'down');
    await element(by.id('signInButton')).tap();

    await expect(element(by.text('Welcome!'))).toBeVisible();
  });
});
