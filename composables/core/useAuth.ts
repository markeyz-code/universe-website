import { useState } from '#app';
import { computed } from 'vue';

export const useAuth = () => {
  const token = useState<string | null>('auth_token', () => null);
  const user = useState<any>('auth_user', () => null);

  const isLoggedIn = computed(() => !!token.value);

  /** Restore auth state from localStorage on page load */
  const initAuth = () => {
    if (!import.meta.client) return;
    const storedToken = localStorage.getItem('intern_token');
    const storedUser = localStorage.getItem('intern_user');
    if (storedToken) {
      token.value = storedToken;
      if (storedUser) {
        try { user.value = JSON.parse(storedUser); } catch {}
      }
    } else {
      token.value = null;
      user.value = null;
    }
  };

  /** Persist auth after login */
  const setAuth = (newToken: string, newUser: any) => {
    token.value = newToken;
    user.value = newUser;
    if (import.meta.client) {
      localStorage.setItem('intern_token', newToken);
      localStorage.setItem('intern_user', JSON.stringify(newUser));
    }
  };

  /** Clear auth on logout */
  const clearAuth = () => {
    token.value = null;
    user.value = null;
    if (import.meta.client) {
      localStorage.removeItem('intern_token');
      localStorage.removeItem('intern_user');
    }
  };

  const isIntern = computed(() => user.value?.role === 'INTERN_MEMBER');
  const isAlumni = computed(() => user.value?.role === 'ALUMNI_MEMBER');
  const isSuperAdmin = computed(() => user.value?.role === 'SUPER_ADMIN');

  return { token, user, isLoggedIn, isIntern, isAlumni, isSuperAdmin, initAuth, setAuth, clearAuth };
};
