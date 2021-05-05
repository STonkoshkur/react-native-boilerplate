const email = `john.doe@example.com`;
const password = 'secret';

const loginUser = async (loginEmail = email, loginPassword = password) => {
  await waitFor(element(by.id('signInPassword')))
    .toBeVisible()
    .whileElement(by.id('signInScroll'))
    .scroll(50, 'down');
  await element(by.id('signInPassword')).typeText(loginPassword);

  await waitFor(element(by.id('signInEmail')))
    .toBeVisible()
    .whileElement(by.id('signInScroll'))
    .scroll(50, 'up');
  await element(by.id('signInEmail')).typeText(loginEmail);

  await waitFor(element(by.id('signInButton')))
    .toBeVisible()
    .whileElement(by.id('signInScroll'))
    .scroll(50, 'down');
  await element(by.id('signInButton')).tap();
};

export { email, password, loginUser };
