import { v4 as uuid } from 'uuid';
import { expect, test } from '../fixtures/baseFixtures';
import DashboardPage from '../model/dashboard.pageModel';
import DashboardDetailsPage from '../model/dashboardDetails.pageModel';
import DashboardFormPage from '../model/form/dashboardForm.pageModel';

/**
 * Content of the test
 * -------------------
 * Check open/close form.
 * Check fields validation in the form.
 * Create a new dashboard.
 * Check data of listed dashboards.
 * Check details of a dashboard.
 * Update dashboard name.
 * Delete a dashboard.
 */
test('Dashboard CRUD', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  const dashboardDetailsPage = new DashboardDetailsPage(page);
  const dashboardForm = new DashboardFormPage(page); // TODO refacto DashboardFormPage to use Field page models like ReportFormPageModel

  await page.goto('/dashboard/workspaces/dashboards');

  // region Check open/close form.
  // -----------------------------
  await dashboardPage.openButtonModal().hover();
  await dashboardPage.addNewDashboard().click();
  await expect(dashboardForm.getCreateTitle()).toBeVisible();
  await dashboardForm.getCancelButton().click();
  await expect(dashboardForm.getCreateTitle()).not.toBeVisible();
  await dashboardPage.openButtonModal().hover();
  await dashboardPage.addNewDashboard().click();
  await expect(dashboardForm.getCreateTitle()).toBeVisible();

  // region fields validation in the form.
  // -----------------------------
  const dashboardName = `Dashboard - ${uuid()}`;
  await dashboardForm.nameField.fill('');
  await dashboardForm.getCreateButton().click();
  await expect(page.getByText('This field is required')).toBeVisible();
  await dashboardForm.nameField.fill('a');
  await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
  await dashboardForm.nameField.fill(dashboardName);
  await expect(page.getByText('Name must be at least 2 characters')).toBeHidden();

  await dashboardForm.descriptionField.fill('Test e2e Description');
  await expect(dashboardForm.descriptionField.get()).toHaveValue('Test e2e Description');

  // region Create a new dashboard.
  // -----------------------------
  await dashboardForm.getCreateButton().click();

  // region Check data of listed dashboards.
  // ---------
  await dashboardPage.getItemFromList(dashboardName).click();
  // endregion

  // region Check details of a dashboard.
  // ---------
  await expect(dashboardDetailsPage.getDashboardDetailsPage()).toBeVisible();
  // endregion

  // region Check content of a dashboard
  // -----------------------------------

  // TODO create a second one

  // region Check that listed dashboards have correct data
  // -----------------------------------------------------

  // TODO go to dashboard and assert name (12)

  // ---------
  // endregion

  // region Update dashboard content
  // -------------------------------

  // TODO go to dashboard and open update form to change the name (19/20/21)

  // ---------
  // endregion

  // region Delete a dashboard
  // -------------------------

  // TODO go to dashboard and delete but cancel (22/23)
  // TODO go to dashboard and delete with confirm (24)

  // TODO from list page delete the other one

  // ---------
  // endregion
});
