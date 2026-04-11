import { CanActivateFn } from '@angular/router';

// todo: change later to form component
export const unsavedChangesGuard: CanActivateFn = (route, state) => {
  return true;
};
