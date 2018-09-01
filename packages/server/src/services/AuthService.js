import UserRepository from 'repositories/UserRepository';
import OpenIdRepository from 'repositories/OpenIdRepository';
import * as jwt from 'utilities/JWT';

export async function associateUserWithOpenId(openIdData) {
  const openId = await OpenIdRepository.findForProvider(openIdData.provider, openIdData.id);

  if (openId) {
    return UserRepository.get(openId.userId);
  }

  const user = await UserRepository.create({
    name: openIdData.name,
    displayName: openIdData.displayName,
    avatar: openIdData.avatar,
  });

  await OpenIdRepository.create({
    userId: user.id,
    identityUrl: openIdData.identityUrl,
    provider: openIdData.provider,
    providerId: openIdData.id,
  });

  return Promise.resolve(user);
}

export function createTokenForUser(user) {
  return jwt.sign({
    userId: user.id,
  });
}
