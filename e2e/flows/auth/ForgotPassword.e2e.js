describe('Forgot password flow', () => {
  const email = `john.doe@example.com`;

  beforeEach(async () => {
    await device.launchApp();
  });
  it('should forgot password successfully', async () => {
    await element(by.id('forgotPasswordButtonScreen')).tap();
    await waitFor(element(by.id('forgotPasswordEmail')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('forgotPasswordEmail')).typeText(email);

    await waitFor(element(by.id('forgotPasswordButton')))
      .toBeVisible()
      .whileElement(by.id('forgotPasswordScroll'))
      .scroll(50, 'down');
    await element(by.id('forgotPasswordButton')).tap();

    await expect(element(by.text('Success'))).toBeVisible();
  });
});
