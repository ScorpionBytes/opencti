import { v4 as uuid } from 'uuid';
import { expect, test } from '../fixtures/baseFixtures';
import DashboardPage from '../model/dashboard.pageModel';
import DashboardDetailsPage from '../model/dashboardDetails.pageModel';
import DashboardFormPage from '../model/form/dashboardForm.pageModel';
import DashboardWidgetsPageModel from '../model/DashboardWidgets.pageModel';

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
  const dashboardForm = new DashboardFormPage(page);

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
  await expect(dashboardPage.getItemFromList(dashboardName)).toBeVisible();
  // endregion

  // region Check details of a dashboard.
  // ---------
  await dashboardPage.getItemFromList(dashboardName).click();
  await expect(dashboardDetailsPage.getDashboardDetailsPage()).toBeVisible();
  // endregion

  // region Update dashboard name.
  // -----------------------------------
  const updateDashboardName = `UpdateDashboard - ${uuid()}`;
  await dashboardDetailsPage.openPopUpButton().click();
  await dashboardDetailsPage.getEditButton().click();
  await expect(dashboardForm.getUpdateTitle()).toBeVisible();
  await dashboardForm.nameField.fill(updateDashboardName);
  await dashboardForm.getCloseButton().click();
  await expect(dashboardDetailsPage.getTextForHeading(updateDashboardName)).toBeVisible();
  // const heading = await dashboardDetailsPage.getTextForHeading(updateDashboardName);
  // console.log(await heading.textContent());
  // await expect(heading).toBeVisible();
  // ---------
  // endregion

  // region Check that listed dashboards have correct data
  // -----------------------------------------------------
  await page.goto('/dashboard/workspaces/dashboards');
  await dashboardPage.getItemFromList(updateDashboardName).click();
  await expect(dashboardDetailsPage.getDashboardDetailsPage()).toBeVisible();
  // ---------
  // endregion

  // region Update dashboard content
  // -------------------------------
  const updateDashboardDescription = 'Test e2e Description';
  await dashboardDetailsPage.openPopUpButton().click();
  await dashboardDetailsPage.getEditButton().click();
  await expect(dashboardForm.getUpdateTitle()).toBeVisible();
  await dashboardForm.descriptionField.fill(updateDashboardDescription);
  await expect(dashboardForm.descriptionField.get()).toHaveValue('Test e2e Description');
  await dashboardForm.getCloseButton().click();
  await expect(dashboardDetailsPage.getTextForHeading(updateDashboardName)).toBeVisible();
  // ---------
  // endregion

  // region Delete a dashboard
  // -------------------------
  await dashboardDetailsPage.openPopUpButton().click();
  await dashboardDetailsPage.getDeleteButton().click();
  await expect(dashboardDetailsPage.getDeletePopup()).toBeVisible();
  await dashboardDetailsPage.getDeletePopup().click();
  await expect(dashboardPage.getPageTitle()).toBeVisible();
  await expect(dashboardDetailsPage.getTextForHeading(updateDashboardName)).not.toBeVisible();

  // ---------
  // endregion
});

test('TMP DASHBOARD WIDGETS', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  const dashboardForm = new DashboardFormPage(page);
  const widgetsPage = new DashboardWidgetsPageModel(page);

  await page.goto('/dashboard/workspaces/dashboards');

  await dashboardPage.openButtonModal().hover();
  await dashboardPage.addNewDashboard().click();
  const dashboardName = `Dashboard - ${uuid()}`;
  await dashboardForm.nameField.fill(dashboardName);
  await dashboardForm.getCreateButton().click();
  await dashboardPage.getItemFromList(dashboardName).click();

  await widgetsPage.createNumberOfMalwaresWidget();
});
