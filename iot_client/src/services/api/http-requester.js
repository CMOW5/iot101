import axios from 'axios';

/* utils */


/**
 * helper class to make http requests
 */
export default class HttpRequester {
  /**
   * this class name.
   *
   * @return {string} the class name
   */
  static className() {
    return 'HttpRequester';
  }

  /**
   * Send a GET request to the given URL.
   *
   * @param {string} url
   * @return {Promise}
   */
  static get(url) {
    return this.submit('get', url);
  }

  /**
   * Send a POST request to the given URL.
   *
   * @param {string} url the request url
   * @param {Object} data the data attached to the request
   * @return {Promise}
   */
  static post(url, data={}) {
    return this.submit('post', url, data);
  }

  /**
   * Send a PUT request to the given URL.
   *
   * @param {string} url the request url
   * @param {Object} data the data attached to the request
   * @return {Promise}
   */
  static put(url, data) {
    return this.submit('put', url, data);
  }

  /**
   * Send a PATCH request to the given URL.
   *
   * @param {string} url the request url
   * @param {Object} data the data attached to the request
   * @return {Promise}
   */
  static patch(url, data) {
    return this.submit('patch', url, data);
  }

  /**
   * Send a DELETE request to the given URL.
   *
   * @param {string} url the request url
   * @return {Promise}
   */
  static delete(url) {
    return this.submit('delete', url);
  }

  /**
   * Submit the data.
   *
   * @param {string} requestType
   * @param {string} url
   * @param {Object} data
   * @return {Promise}
   */
  static submit(requestType, url, data = {}) {
    const methodName = ' submit(..) ';

    console.log(this.className() + methodName +
      'requestType= ' + requestType + ' url= ' + url + ' data= ', data);

    return new Promise((resolve, reject) => {
      axios({
        method: requestType,
        url: url,
        data: data,
        // headers: {Authorization: 'Bearer ' + token},
      })
        .then((response) => {
          const methodName = ' then(..) ';
          console.log(this.className() + methodName +
            'response = ', response);

          this.onSuccess(response.data);
          resolve(response);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          console.log(this.className() + methodName + 'error = ', error);
          this.onFail(error.response.data);

          const status = error.response.status;

          if (status === 401) {
            // EventProvider.fire("unauthorized");
          }

          reject(error);
        });
    });
  }

  /**
   * do something extra if the request was sucessful
   * @param {Object} data
   */
  static onSuccess(data) {
    // do something extra when the request is ok
  }

  /**
   * do something extra if the request was invalid
   * @param {Object} data
   */
  static onFail(data) {
    // do something extra when the request have failed
  }
}
