import * as UserRepository from 'domain/repositories/UserRepository';
import * as OpenIdRepository from 'domain/repositories/OpenIdRepository';

export async function getUserWithOpenId(provider, id) {
  const openId = await OpenIdRepository.get(provider, id);

  return UserRepository.get(openId.userId);
}

export async function associateUserWithOpenId(openIdData) {
  const openId = await OpenIdRepository.find(openIdData.provider, openIdData.id);

  if (openId) {
    await UserRepository.get(openId.userId);

    return Promise.resolve();
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
    provider: 'steam',
  });

  return Promise.resolve();
}
