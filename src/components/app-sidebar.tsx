import {
  Book,
  BookOpen,
  Bot,
  Folder,
  Frame,
  Github,
  Linkedin,
  Settings2,
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
      title: "Projects",
      url: "/",
      icon: Folder,
      isActive: true,
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
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
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
      url: "https://noyonrahman.xyz/blogs",
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
