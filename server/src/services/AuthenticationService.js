import * as UserRepository from 'domain/repositories/UserRepository';
import * as OpenIdRepository from 'domain/repositories/OpenIdRepository';
import * as jwt from 'utilities/JWT';

export async function associateUserWithOpenId(openIdData) {
  const openId = await OpenIdRepository.find(openIdData.provider, openIdData.id);

  if (openId) {
    return UserRepository.get(openId.userId);
  }

  const user = await UserRepository.create({
    name: openIdData.name,
    displayName: openIdData.displayName,
    avatar: openIdData.avatar,
  });

  await OpenIdRepository.create({
    id: openIdData.id,
    userId: user.id,
    identityUrl: openIdData.identityUrl,
    provider: openIdData.provider,
  });

  return Promise.resolve(user);
}

export function createTokenForUser(user) {
  return jwt.sign({
    userId: user.id,
  });
}

export async function getUser(userId) {
  return UserRepository.get(userId);
}
