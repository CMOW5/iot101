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

  /**
   * Get the mesas
   *
   * @param {object} data the mesa data 
   * @return {Promise}
   */
  static create(mesaData) {
    let url = MesasUrls.create();

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, mesaData)
        .then((response) => {
          const createdMesa = response.data.data;
          resolve(createdMesa);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * delete the mesa with the given id
   *
   * @param {number} mesaId 
   * @return {Promise}
   */
  static delete(mesaId) {
    let url = MesasUrls.delete(mesaId);

    return new Promise((resolve, reject) => {
      HttpRequester.delete(url)
        .then((response) => {
          const responseData = response.data.data;
          resolve(responseData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * validate a microcontroller conection
   *
   * @param {object} data the mesa data 
   * @return {Promise}
   */
  static validateConnection() {
    let url = MesasUrls.validateConnection();

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
