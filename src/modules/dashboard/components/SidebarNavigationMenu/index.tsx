import { Sidebar } from 'flowbite-react';
import { FiBarChart2, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { ROUTES } from '../../../../constants/routes';
import { SidbarNavigationMenuProps } from '../HeaderNavigationMenu/type';
export function SidebarNavigationMenu(props: SidbarNavigationMenuProps) {
  return (
    <section
      className={`w-fit fixed md:ml-0 z-10 ${
        props.isToggle ? '-ml-0 transition-all' : '-ml-96 transition-all'
      }`}
      id="sidebar-default"
      aria-labelledby="drawer-label"
    >
      <div className=" h-screen text-white fixed bg-gradient-to-tl from-zinc-700 to-zinc-800 rounded-lg">
        <Sidebar>
          <Sidebar.Logo
            href="#"
            img="https://flowbite.com/docs/images/logo.svg"
          >
            Carbon Neutralize
          </Sidebar.Logo>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                className="!text-gray-500 hover:!text-black group text-sm"
                href={ROUTES.DASHBOARD}
                icon={FiTrendingUp}
                active
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                className="!text-gray-50 hover:!text-black group text-sm"
                href="#"
                icon={FiBarChart2}
              >
                Reports
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                className="!text-gray-50 hover:!text-black group text-sm"
                href="#"
                icon={FiSettings}
              >
                Settings
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </section>
  );
}
