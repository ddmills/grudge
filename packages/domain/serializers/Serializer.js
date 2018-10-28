export default class Serializer {
  static serialize() {
    return {};
  }

  static serializeAll(datas = []) {
    return datas.map((data) => this.deserialize(data));
  }

  static deserialize() {
    return {};
  }

  static deserializeAll(datas = []) {
    return datas.map((data) => this.deserialize(data));
  }
}
