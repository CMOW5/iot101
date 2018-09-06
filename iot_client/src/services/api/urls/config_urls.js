import BaseUrls from './base-urls';

/**
 * this helper class provides methods to get the
 * urls related to the mesas
 */
export default class ConfigUrls extends BaseUrls {
  /**
   * get the base api url
   * @return {string} the base url
   */
  static base() {
    return super.base() + '/config';
  }
  /**
   * url to fetch the config from db
   * 
   * @return {string}
   */
  static fetchConfig() {
    return this.base();
  }

  /**
   * url to update the config in the db
   *
   * @return {string}
   */
  static update() {
    return this.base();
  }
}
