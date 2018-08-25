import HttpRequester from '../http-requester';
import MesasUrls from '../urls/mesas-urls';

/* utils */
// import Logger from 'utils/logger/logger';

/**
 * class to make http request related to the products admin
 */
export default class MesasRequest {
  /**
   * @return {string}
   */
  static className() {
    return 'MesasRequest';
  }

  /**
   * Get the mesas
   *
   * @param {object} queryParams query parameters
   * @param {string} optionalUrl (optional) use this optional url instead
   *  of the default url
   * @return {*}
   */
  static fetchMesas(queryParams={}, optionalUrl) {
    let url = MesasUrls.fetchMesas(queryParams, optionalUrl);

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const mesas = response.data.data;
          resolve(mesas);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get the product with the given id
   *
   * @param {number} id
   * @return {*}
   */
  static fetchMesa(id) {
    let url = MesasUrls.fetchMesa(id);

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const product = response.data.data;
          resolve(product);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
