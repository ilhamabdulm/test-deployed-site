import { FiHome } from 'react-icons/fi';
import { Avatar, Breadcrumb, Dropdown, Navbar } from 'flowbite-react';

import { ROUTES } from '../../../../constants/routes';
import type { HeaderNavigationMenuProps } from './type';
import { useSignOut } from '../../../shared/hooks/useSignOut';
let isToggle = false;
export function HeaderNavigationMenu(props: HeaderNavigationMenuProps) {
  const { user } = props;

  const signOut = useSignOut();
  const ClickHandler = () => {
    isToggle = isToggle ? false : true;
    props.changeToggle(isToggle);
  };
  return (
    <div className="border-b-1">
      <Navbar fluid={true} rounded={true} className="bg-transparent">
        {user && (
          <div className="flex md:order-2 bg-transparent">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => {
                  signOut();
                  window.location.replace(ROUTES.SIGN_IN);
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
        <div className="px-4">
          <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="#" icon={FiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Navbar.Toggle onClick={ClickHandler} />
      </Navbar>
    </div>
  );
}
