import BaseRoutes from './base_routes';
/**
 * the front end routes related to the products (react router)
 */
export default class SettingsRoutes extends BaseRoutes {
  /**
   * @return {string}
   */
  static base() {
    return super.base() + 'settings';
  }
}


