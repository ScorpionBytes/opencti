import { Page } from '@playwright/test';
import TextFieldPageModel from '../field/TextField.pageModel';

export default class DashboardFormPage {
  nameField = new TextFieldPageModel(this.page, 'Name', 'text');
  descriptionField = new TextFieldPageModel(this.page, 'Description', 'text-area');

  constructor(private page: Page) {
  }

  getCreateTitle() {
    return this.page.getByRole('heading', { name: 'Create dashboard' });
  }

  getUpdateTitle() {
    return this.page.getByRole('heading', { name: 'Update dashboard' });
  }

  getCreateButton() {
    return this.page.getByRole('button', { name: 'Create', exact: true });
  }

  getCloseButton() {
    return this.page.getByRole('button', { name: 'Close' });
  }

  getCancelButton() {
    return this.page.getByRole('button', { name: 'Cancel' });
  }

  // getNameInput() {
  //   return this.page.getByLabel('Name');
  // }
  //
  // async fillNameInput(input: string) {
  //   await this.getNameInput().click();
  //   return this.getNameInput().fill(input);
  // }
  //
  // getCloseButton() {
  //   return this.page.getByRole('button', { name: 'Close' });
  // }
  //
  // getTagInput() {
  //   return this.page.getByPlaceholder('New tag');
  // }
  //
  // async fillTagInput(input: string) {
  //   await this.getTagInput().click();
  //   return this.getTagInput().fill(input);
  // }
}
