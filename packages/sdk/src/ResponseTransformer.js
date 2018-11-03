import autobind from 'autobind-decorator';

@autobind
export default class ResponseTransformer {
  static transform(ModelClass, response) {
    return response;
    // if (!response) {
    //   return response;
    // }

    // if (response instanceof Array) {
    //   return response.map((chunk) => this.transform(ModelClass, chunk));
    // }

    // return ModelClass.deserialize(response);
  }

  static toModel(ModelClass) {
    return (response) => ResponseTransformer.transform(ModelClass, response);
  }
}
