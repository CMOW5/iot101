import BaseRoutes from './base_routes';
/**
 * the front end routes related to the products (react router)
 */
export default class MesasRoutes extends BaseRoutes {
  /**
   * @return {string}
   */
  static base() {
    return super.base() + 'mesas';
  }

  /**
   * @return {string}
   */
  static create() {
    return this.base() + '/create';
  }
}


