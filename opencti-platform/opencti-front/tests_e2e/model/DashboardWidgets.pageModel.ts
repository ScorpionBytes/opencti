import { Page } from '@playwright/test';
import FiltersPageModel from './filters.pageModel';
import TextFieldPageModel from './field/TextField.pageModel';

type WidgetPerspective = 'Entities' | 'Knowledge graph' | 'Activity & history';

export default class DashboardWidgetsPageModel {
  private labelPerspective?: 'entities' | 'relationships' | 'audits';

  filters = new FiltersPageModel(this.page);

  constructor(private page: Page) {}

  async openWidgetModal() {
    await this.page.getByLabel('Create', { exact: true }).hover();
    return this.page.getByLabel('Create a widget', { exact: true }).click();
  }

  selectWidget(widgetName: string) {
    return this.page.getByLabel(widgetName, { exact: true }).click();
  }

  selectPerspective(perspective: WidgetPerspective) {
    if (perspective === 'Entities') this.labelPerspective = 'entities';
    if (perspective === 'Knowledge graph') this.labelPerspective = 'relationships';
    if (perspective === 'Activity & history') this.labelPerspective = 'audits';
    return this.page.getByLabel(perspective, { exact: true }).click();
  }

  fillLabel(label: string) {
    const filtersLabelField = new TextFieldPageModel(this.page, `label (${this.labelPerspective})`, 'text');
    return filtersLabelField.fill(label);
  }
}
