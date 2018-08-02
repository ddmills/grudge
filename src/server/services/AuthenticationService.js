import * as UserRepository from 'domain/repositories/UserRepository';
import * as OpenIdRepository from 'domain/repositories/OpenIdRepository';

export async function findOrCreateUserWithOpenId(identityUrl, profile) {
  const openId = await OpenIdRepository.find('steam', profile.id);

  if (openId) {
    return UserRepository.get(openId.userId);
  }

  const user = await UserRepository.create({
    name: profile._json.realname, // eslint-disable-line no-underscore-dangle
    displayName: profile.displayName,
    avatar: profile._json.avatar, // eslint-disable-line no-underscore-dangle
  });

  await OpenIdRepository.create({
    id: profile.id,
    userId: user.id,
    identityUrl,
    provider: 'steam',
  });

  return Promise.resolve(user);
}
