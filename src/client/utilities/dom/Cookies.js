import cookies from 'browser-cookies';

export default class Cookies {
  static read(name) {
    return cookies.get(name);
  }

  static remove(name) {
    if (Cookies.read(name)) {
      cookies.erase(name);
    }
  }

  static set(name, value, options) {
    cookies.set(name, value, options);
  }
}
