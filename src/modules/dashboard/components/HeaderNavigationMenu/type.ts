import { User } from '../../../../types/response/auth/login';

export type HeaderNavigationMenuProps = {
  changeToggle(arg0: boolean): unknown;
  user?: User;
};

export type SidbarNavigationMenuProps = {
  isToggle: boolean;
};
