// utils
import {
  getRegistrationUserData,
  registerUser,
} from '../../../e2e/common/userRegistration';
import { loginUser } from '../../../e2e/common/userLogin';
// localization
import localeStrings from '../../../src/assets/localization/en';

const { email, firstName, lastName, password } = getRegistrationUserData();

describe('Manage user profile', () => {
  beforeAll(async () => {
    await device.launchApp();
    await registerUser({
      email,
      firstName,
      lastName,
      password,
    });
  });

  it('"Settings" tab should be shown after user sign up', async () => {
    await expect(
      element(by.text(localeStrings.settings.settings)),
    ).toBeVisible();
  });

  it('User full name and email should be shown after navigation to the "Settings" page', async () => {
    await element(by.text(localeStrings.settings.settings)).tap();

    await expect(element(by.id('settingsFullNameLabel'))).toBeVisible();
    await expect(element(by.id('settingsEmailLabel'))).toBeVisible();
  });

  it('User full name and email should be correct on the "Settings" page', async () => {
    await expect(element(by.id('settingsFullNameLabel'))).toHaveText(
      `${firstName} ${lastName}`,
    );
    await expect(element(by.id('settingsEmailLabel'))).toHaveText(email);
  });

  describe('Update profile flows', () => {
    it('Edit profile link should be shown on the "Settings" page', async () => {
      await expect(element(by.id('profileEdit'))).toBeVisible();
    });

    it('Edit profile form should be shown after press on "Edit profile" link', async () => {
      await element(by.id('profileEdit')).tap();

      // profile inputs
      await expect(element(by.id('editProfileFirstName'))).toBeVisible();
      await expect(element(by.id('editProfileLastName'))).toBeVisible();

      // form buttons
      await expect(element(by.id('closeEditProfileButton'))).toBeVisible();
      await expect(element(by.id('submitEditProfileButton'))).toBeVisible();
    });

    it('Edit profile form should be hidden after press on close form button', async () => {
      await element(by.id('closeEditProfileButton')).tap();

      await expect(element(by.id('profileEdit'))).toBeVisible();
      await expect(element(by.id('closeEditProfileButton'))).not.toBeVisible();
    });

    it('Edit profile page should be hidden after successful submission of updated profile form', async () => {
      await element(by.id('profileEdit')).tap();

      // change first name
      await waitFor(element(by.id('editProfileFirstName')))
        .toBeVisible()
        .whileElement(by.id('editProfileScroll'))
        .scroll(50, 'down');
      await element(by.id('editProfileFirstName')).typeText(' updated');

      // change last name
      await waitFor(element(by.id('editProfileLastName')))
        .toBeVisible()
        .whileElement(by.id('editProfileScroll'))
        .scroll(50, 'down');
      await element(by.id('editProfileLastName')).typeText(' updated');

      // submit form
      await element(by.id('submitEditProfileButton')).tap();

      // check form page has been closed
      await expect(element(by.id('editProfileScroll'))).not.toBeVisible();
      await expect(element(by.id('settingsFullNameLabel'))).toBeVisible();
    });

    it('User full name label should be changed after successful submission of updated profile form', async () => {
      await expect(element(by.id('settingsFullNameLabel'))).toHaveText(
        `${firstName} updated ${lastName} updated`,
      );
    });
  });

  describe('Change password flow', () => {
    const newPassword = `${password}changed`;

    it('Change password link should be shown on the "Settings" page', async () => {
      await expect(element(by.id('changePassword'))).toBeVisible();
    });

    it('Change password form should be shown after press on "Change password" link', async () => {
      await element(by.id('changePassword')).tap();

      // form inputs
      await expect(element(by.id('editOldPassword'))).toBeVisible();
      await expect(element(by.id('editNewPassword'))).toBeVisible();
      await expect(element(by.id('editNewPasswordConfirmation'))).toBeVisible();

      // form buttons
      await expect(element(by.id('closeEditPasswordButton'))).toBeVisible();
      await expect(element(by.id('submitEditPasswordButton'))).toBeVisible();
    });

    it('Change password page should be hidden after successful submission of updated password form', async () => {
      // fill-in old password
      await waitFor(element(by.id('editOldPassword')))
        .toBeVisible()
        .whileElement(by.id('changePasswordScroll'))
        .scroll(50, 'down');
      await element(by.id('editOldPassword')).typeText(password);

      // fill-in new password
      await waitFor(element(by.id('editNewPassword')))
        .toBeVisible()
        .whileElement(by.id('changePasswordScroll'))
        .scroll(50, 'down');
      await element(by.id('editNewPassword')).typeText(newPassword);

      // fill-in new password confirmation
      await waitFor(element(by.id('editNewPasswordConfirmation')))
        .toBeVisible()
        .whileElement(by.id('changePasswordScroll'))
        .scroll(50, 'down');
      await element(by.id('editNewPasswordConfirmation')).typeText(newPassword);

      // submit form
      await element(by.id('submitEditPasswordButton')).tap();

      // check form page has been closed
      await expect(element(by.id('changePasswordScroll'))).not.toBeVisible();
      await expect(element(by.id('settingsFullNameLabel'))).toBeVisible();
    });

    describe('Sign-in flow after password update and logout', () => {
      // logout from current session
      beforeAll(async () => {
        await waitFor(element(by.id('logoutButton')))
          .toBeVisible()
          .whileElement(by.id('settingsScroll'))
          .scroll(200, 'down');
        await element(by.id('logoutButton')).tap();
        await element(by.text(localeStrings.common.logout)).atIndex(0).tap();
      });

      it('Wrong password error should be shown while trying to sign-in with old password', async () => {
        await loginUser(email, password);
        await expect(
          element(by.text(localeStrings.validation.incorrectPassword)),
        ).toBeVisible();
      });

      it('Sign-in with new password should be successfully finished', async () => {
        // change password value to updated one
        await element(by.id('signInPassword')).replaceText(newPassword);
        await waitFor(element(by.id('signInButton')))
          .toBeVisible()
          .whileElement(by.id('signInScroll'))
          .scroll(50, 'down');
        await element(by.id('signInButton')).tap();

        // valication errors should be hidden
        await expect(
          element(by.text(localeStrings.validation.emailNotExists)),
        ).not.toBeVisible();
        await expect(
          element(by.text(localeStrings.validation.incorrectPassword)),
        ).not.toBeVisible();
        await expect(element(by.text('Welcome!'))).toBeVisible();
      });

      // return to the "Settings" page
      afterAll(async () => {
        await element(by.text(localeStrings.settings.settings)).tap();
      });
    });
  });

  describe('Remove profile flow', () => {
    it('Remove account action should be visible on the "Settings" page', async () => {
      await waitFor(element(by.id('removeAccountButton')))
        .toBeVisible()
        .whileElement(by.id('settingsScroll'))
        .scroll(200, 'down');
    });

    it('Remove account prompt should be shown after press on the remove account action', async () => {
      await element(by.id('removeAccountButton')).tap();
      await expect(element(by.text(localeStrings.common.cancel))).toBeVisible();
      await expect(
        element(by.text(localeStrings.settings.removeAccount)).atIndex(0),
      ).toBeVisible();
    });

    it('Profile removing flow should be cancelled after press on "Cancel" button inside the account deleting prompt', async () => {
      await element(by.text(localeStrings.common.cancel)).tap();

      await expect(
        element(by.text(localeStrings.common.cancel)),
      ).not.toBeVisible();
      await expect(element(by.id('removeAccountButton'))).toBeVisible();
    });

    it('Profile should be removed and user should be redirected to the sign-in page after press on "Remove account" inside the account deleting prompt', async () => {
      await element(by.id('removeAccountButton')).tap();
      await element(by.text(localeStrings.settings.removeAccount))
        .atIndex(0)
        .tap();

      await expect(element(by.id('signInEmail'))).toBeVisible();
      await expect(element(by.id('editProfileScroll'))).not.toBeVisible();
    });

    it('Invalid email error should be shown when trying to login with credentionals of deleted profile', async () => {
      await loginUser(email, password);

      await expect(
        element(by.text(localeStrings.validation.emailNotExists)),
      ).toBeVisible();
    });
  });
});
