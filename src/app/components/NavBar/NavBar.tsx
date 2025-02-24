import { JSX } from "react";

import "./NavBar.css";

type NavigationLink = {
  name: string;
  href: string;
  icon: string;
  isAuthenticated?: boolean;
};

const navigationLinks: NavigationLink[] = [
  { name: "Search", href: "/", icon: "search" },
  { name: "Profile", href: "/profile", icon: "user", isAuthenticated: true },
  {
    name: "Shelf",
    href: "/profile/shelf",
    icon: "book",
    isAuthenticated: true,
  },
  { name: "Login", href: "/login", icon: "user", isAuthenticated: false },
  { name: "Logout", href: "/logout", icon: "door-open", isAuthenticated: true },
];

export const NavBar = () => {
  const isLoggedIn = true;

  const renderSearch = (): JSX.Element => {
    const search = navigationLinks.filter((link) => link.name === "Search")[0];

    return (
      <li>
        <a href={search.href}>{search.name}</a>
      </li>
    );
  };

  const renderNavigationLinks = (): JSX.Element[] => {
    const linksToRender = navigationLinks.filter(
      (link) => link.isAuthenticated === isLoggedIn
    );
    return linksToRender.map((link) => (
      <li key={link.name}>
        <a href={link.href}>{link.name}</a>
      </li>
    ));
  };

  return (
    <nav>
      <ul>
        {renderSearch()}
        {renderNavigationLinks()}
      </ul>
    </nav>
  );
};
