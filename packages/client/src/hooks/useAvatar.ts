import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import type { TUser } from 'librechat-data-provider';

const avatarCache: Record<string, string> = {};

const useAvatar = (user: TUser | undefined): string => {
  return useMemo(() => {
    const { username, name } = user ?? {};
    const seed = name || username;
    if (!seed) {
      return '';
    }

    if (user?.avatar && user?.avatar !== '') {
      return user.avatar;
    }

    if (avatarCache[seed]) {
      return avatarCache[seed];
    }

    const avatar = createAvatar(initials, {
      seed,
      fontFamily: ['Verdana'],
      fontSize: 36,
      backgroundType: ['solid'],
      backgroundColor: [
        '8375e0',
        '6a5ad6',
        '4732c2',
        '3e2bac',
        '34248f',
        '2a1d75',
        '1f1657',
        'c6beee',
        '5a46c8',
        '7b6bd4',
        '4f3db8',
        '6350c4',
        '2d1f7c',
        '3a3350',
      ],
      textColor: ['ffffff'],
    });

    let avatarDataUri = '';
    try {
      avatarDataUri = avatar.toDataUri();
      if (avatarDataUri) {
        avatarCache[seed] = avatarDataUri;
      }
    } catch (error) {
      console.error('Failed to generate avatar:', error);
    }

    return avatarDataUri;
  }, [user]);
};

export default useAvatar;
