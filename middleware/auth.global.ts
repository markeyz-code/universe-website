export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn, initAuth } = useAuth();

  // Initialize from localStorage on every route change
  initAuth();

  const protectedRoutes = ['/vault', '/mentorship', '/career'];
  const isProtected = protectedRoutes.some((route) => to.path.startsWith(route));

  if (isProtected && !isLoggedIn.value) {
    return navigateTo('/login');
  }
});
