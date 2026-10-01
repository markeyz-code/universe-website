import { useAuth } from '@/composables/core/useAuth';

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, initAuth } = useAuth();

  // Ensure auth state is synced on every route change
  initAuth();

  const isAuthPage = to.path === '/login' || to.path === '/register';
  const isProtectedRoute = to.path.startsWith('/dashboard');

  // If user is already logged in and visits login or register, redirect to dashboard overview
  if (isLoggedIn.value && isAuthPage) {
    return navigateTo('/dashboard/overview');
  }

  // If user is NOT logged in and tries to access dashboard, redirect to login
  if (!isLoggedIn.value && isProtectedRoute) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
