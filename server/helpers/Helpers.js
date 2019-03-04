export default class Helpers {
  static emailExist(array, email) {
    let result = false;
    array.forEach((data) => {
      if (data === email) {
        result = true;
      }
    });
    return result;
  }
}
