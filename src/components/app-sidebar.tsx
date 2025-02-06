import {
  Book,
  Folder,
  Frame,
  Github,
  LayoutGrid,
  Linkedin,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { OthersLinks } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { useAppSelector } from "@/redux/hook";
import { selectUser } from "@/redux/features/auth/authSlice";

const Logo = () => (
  <React.Fragment>
    <img src="/logo-black.png" alt="Logo" className="dark:hidden" />
    <img src="/logo-white.png" alt="Logo" className="hidden dark:block" />
  </React.Fragment>
);

// This is sample data.
const data = {
  user: {
    name: "Noyon Rahman",
    email: "noyonrahman2003@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/89659561?v=4",
  },
  teams: [
    {
      name: "Noyon Rahman",
      logo: Logo,
      plan: "Full Stack Developer",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/overview",
      icon: LayoutGrid,
      collapsible: false,
    },
    {
      title: "Projects",
      url: "/",
      icon: Folder,
      isActive: true,
      collapsible: true,
      items: [
        {
          title: "Add Projects",
          url: "/add-project",
        },
        {
          title: "Projects",
          url: "/projects",
        },
      ],
    },
    {
      title: "Blogs",
      url: "/blogs",
      icon: Book,
      isActive: true,
      collapsible: true,
      items: [
        {
          title: "Add Blog",
          url: "/add-blog",
        },
        {
          title: "Blogs",
          url: "/blogs",
        },
      ],
    },
  ],
  others: [
    {
      name: "Portfolio",
      url: "https://noyonrahman.xyz",
      icon: Frame,
      target: "_blank",
    },
    {
      name: "Blogs",
      url: "https://blog.noyonrahman.xyz",
      icon: Book,
      target: "_blank",
    },
    {
      name: "Github",
      url: "https://github.com/noyonalways",
      icon: Github,
      target: "_blank",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/noyonalways",
      icon: Linkedin,
      target: "_blank",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(selectUser);

  data.user.avatar = user?.avatar || "";
  data.user.email = user?.email || "";
  data.user.name = user?.name || "";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <OthersLinks projects={data.others} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
