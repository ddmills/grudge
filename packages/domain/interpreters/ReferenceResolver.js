import Resolvers from './resolvers';

export default class ReferenceResolver {
  static isRef(value) {
    return Boolean(
      value !== null
      && typeof value === 'object'
      && 'id' in value,
    );
  }

  static getResolver(refId) {
    return Resolvers.find((r) => r.id === refId);
  }

  static resolve(ctx, cardId, ref) {
    if (Array.isArray(ref)) {
      return ref.map((v) => this.resolve(ctx, cardId, v));
    }

    if (!this.isRef(ref)) {
      return ref;
    }

    const resolver = this.getResolver(ref.id);

    if (!resolver) {
      return ref;
    }

    const value = resolver.resolve(ctx, cardId, ref);

    return this.resolve(ctx, cardId, value);
  }
}
