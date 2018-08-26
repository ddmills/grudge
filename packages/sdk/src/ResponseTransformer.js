import autobind from 'autobind-decorator';

@autobind
export default class ResponseTransformer {
  static transform(ModelClass, response) {
    if (!response) {
      return response;
    }

    if (response instanceof Array) {
      return response.map(this.toModel);
    }

    return new ModelClass(response);
  }

  static toModel(ModelClass) {
    return (response) => ResponseTransformer.transform(ModelClass, response);
  }
}
