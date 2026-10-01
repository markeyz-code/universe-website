import { useAuth } from '@/composables/core/useAuth';

export default defineNuxtPlugin(async () => {
  const { initAuth, fetchUserProfile, isLoggedIn } = useAuth();

  // Restore session immediately
  initAuth();

  // If user has a token, sync latest profile in the background
  if (isLoggedIn.value) {
    try {
      await fetchUserProfile();
    } catch {
      // Ignore background refresh errors
    }
  }
});
