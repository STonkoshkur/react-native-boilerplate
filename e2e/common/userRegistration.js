const generateNewRegistrationUserData = () => ({
  email: `e2e.user.${Date.now()}@example.com`,
  password: 'secret',
  firstName: 'User',
  lastName: `For testing ${Date.now()}`,
});

const registerUser = async (userData = {}) => {
  const { email, password, firstName, lastName } = {
    ...generateNewRegistrationUserData(),
    ...userData,
  };

  await element(by.id('signUpButtonScreen')).tap();
  await waitFor(element(by.id('signUpEmail')))
    .toBeVisible()
    .withTimeout(10000);

  await waitFor(element(by.id('signUpPassword')))
    .toBeVisible()
    .whileElement(by.id('signUpScroll'))
    .scroll(50, 'down');
  await element(by.id('signUpPassword')).typeText(password);

  await waitFor(element(by.id('signUpEmail')))
    .toBeVisible()
    .whileElement(by.id('signUpScroll'))
    .scroll(50, 'up');
  await element(by.id('signUpEmail')).typeText(email);

  await waitFor(element(by.id('signUpFirstName')))
    .toBeVisible()
    .whileElement(by.id('signUpScroll'))
    .scroll(50, 'down');
  await element(by.id('signUpFirstName')).typeText(firstName);

  await waitFor(element(by.id('signUpLastName')))
    .toBeVisible()
    .whileElement(by.id('signUpScroll'))
    .scroll(50, 'down');
  await element(by.id('signUpLastName')).typeText(lastName);

  await waitFor(element(by.id('signUpIsAgreed')))
    .toBeVisible()
    .whileElement(by.id('signUpScroll'))
    .scroll(50, 'down');
  await element(by.id('signUpIsAgreed')).tap();

  await waitFor(element(by.id('signUpButton')))
    .toBeVisible()
    .whileElement(by.id('signUpScroll'))
    .scroll(50, 'down');
  await element(by.id('signUpButton')).tap();
};

export { generateNewRegistrationUserData, registerUser };
