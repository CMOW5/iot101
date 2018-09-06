import HttpRequester from '../http-requester';
import ConfigUrls from '../urls/config_urls';

/* utils */
// import Logger from 'utils/logger/logger';

/**
 * class to make http request related to the products admin
 */
export default class ConfigApi {
  /**
   * @return {string}
   */
  static className() {
    return 'ConfigApi';
  }

  /**
   * Get the config
   *
   * @return {Promise}
   */
  static fetchConfig() {
    let url = ConfigUrls.fetchConfig();

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const config = response.data.data;
          resolve(config);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get the product with the given id
   * @param {object} data 
   * @return {Promise}
   */
  static update(data) {
    let url = ConfigUrls.update();

    return new Promise((resolve, reject) => {
      HttpRequester.put(url, data)
        .then((response) => {
          const config = response.data.data;
          resolve(config);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
