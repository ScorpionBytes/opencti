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

  // region Create a new dashboard
  // -----------------------------

  // TODO assert available options to create dashboard (4)
  // TODO open create form (5/6/7)
  // TODO check that inputs validation is ok (8/9)
  // TODO create dashboard (10)
  // TODO create a second one

  // ---------
  // endregion

  // region Check that listed dashboards have correct data
  // -----------------------------------------------------

  // TODO assert listed dashboards columns data (2/3)

  // ---------
  // endregion

  // region Check content of a dashboard
  // -----------------------------------

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
