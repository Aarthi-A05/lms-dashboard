// Utility function to check if a user has a specific permission
export const hasPermission = (user: any, permission: string): boolean => {
  // Return true if user has the permission, false otherwise (handles null/undefined user)
  return user?.permissions?.includes(permission) || false;
};