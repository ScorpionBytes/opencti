import { Page } from '@playwright/test';

export default class DashboardDetailsPage {
  constructor(private page: Page) {
  }

  getDashboardDetailsPage() {
    return this.page.getByTestId('dashboard-details-page');
  }

  getTitle(name: string) {
    return this.page.getByRole('heading', { name });
  }

  openPopUpButton() {
    return this.page.getByTestId('popover');
  }

  getEditButton() {
    return this.page.getByLabel('Edit');
  }

  getDeleteButton() {
    return this.page.getByRole('menuitem', { name: 'Delete' });
  }

  getDeletePopup() {
    return this.page.getByRole('button', { name: 'Delete' });
  }
  addNewDashboardTag() {
    return this.page.getByLabel('Add tag');
  }

  getTag(name: string) {
    return this.page.getByRole('button', { name });
  }

  getTextForHeading(text: string) {
    return this.page.getByText(text);
  }
}
