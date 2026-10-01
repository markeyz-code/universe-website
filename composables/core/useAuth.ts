import { useState, useCookie } from '#app';
import { computed } from 'vue';

export const useAuth = () => {
  const tokenCookie = useCookie<string | null>('intern_token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: 'lax',
  });

  const userCookie = useCookie<any>('intern_user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: 'lax',
  });

  const token = useState<string | null>('auth_token', () => tokenCookie.value);
  const user = useState<any>('auth_user', () => userCookie.value);

  const isLoggedIn = computed(() => {
    return !!token.value || !!tokenCookie.value || (import.meta.client && !!localStorage.getItem('intern_token'));
  });

  const isAuthenticated = computed(() => isLoggedIn.value);

  /** Restore and synchronize auth state across cookies, state, and localStorage */
  const initAuth = () => {
    // On server, initialize from request cookies
    if (!import.meta.client) {
      if (tokenCookie.value) token.value = tokenCookie.value;
      if (userCookie.value) user.value = userCookie.value;
      return;
    }

    // On client, check both localStorage and cookies
    const storedToken = localStorage.getItem('intern_token') || tokenCookie.value;
    let storedUser: any = null;
    try {
      const rawUser = localStorage.getItem('intern_user');
      storedUser = rawUser ? JSON.parse(rawUser) : userCookie.value;
    } catch {
      storedUser = userCookie.value;
    }

    if (storedToken) {
      token.value = storedToken;
      tokenCookie.value = storedToken;
      localStorage.setItem('intern_token', storedToken);

      if (storedUser) {
        user.value = storedUser;
        userCookie.value = storedUser;
        localStorage.setItem('intern_user', JSON.stringify(storedUser));
      }
    } else {
      token.value = null;
      tokenCookie.value = null;
      user.value = null;
      userCookie.value = null;
      localStorage.removeItem('intern_token');
      localStorage.removeItem('intern_user');
    }
  };

  /** Persist auth after login across state, cookies, and localStorage */
  const setAuth = (newToken: string, newUser: any) => {
    token.value = newToken;
    tokenCookie.value = newToken;

    user.value = newUser;
    userCookie.value = newUser;

    if (import.meta.client) {
      localStorage.setItem('intern_token', newToken);
      localStorage.setItem('intern_user', JSON.stringify(newUser));
    }
  };

  /** Clear auth on logout */
  const clearAuth = () => {
    token.value = null;
    tokenCookie.value = null;
    user.value = null;
    userCookie.value = null;

    if (import.meta.client) {
      localStorage.removeItem('intern_token');
      localStorage.removeItem('intern_user');
    }
  };

  /** Fetch latest user profile from backend /auth/me */
  const fetchUserProfile = async () => {
    const currentToken = getToken();
    if (!currentToken) return null;

    try {
      const { authApi } = await import('@/api_factory/modules/auth');
      const response = await authApi.me();
      if (response && response.data) {
        user.value = response.data;
        userCookie.value = response.data;
        if (import.meta.client) {
          localStorage.setItem('intern_user', JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch (err) {
      // In case token is expired or unauthorized
      console.warn('Failed to refresh user profile:', err);
    }
    return null;
  };

  const isIntern = computed(() => user.value?.role === 'INTERN_MEMBER');
  const isAlumni = computed(() => user.value?.role === 'ALUMNI_MEMBER');
  const isSuperAdmin = computed(() => user.value?.role === 'SUPER_ADMIN');

  const getToken = () => {
    if (token.value) return token.value;
    if (tokenCookie.value) return tokenCookie.value;
    if (import.meta.client) return localStorage.getItem('intern_token');
    return null;
  };

  return {
    token,
    user,
    isLoggedIn,
    isAuthenticated,
    isIntern,
    isAlumni,
    isSuperAdmin,
    initAuth,
    setAuth,
    clearAuth,
    fetchUserProfile,
    getToken,
  };
};
