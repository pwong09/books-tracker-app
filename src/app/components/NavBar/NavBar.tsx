'use client';

import { JSX } from "react";

import Link from "next/link";

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

  const handleSkipNavigationClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    focusOnMainContent();
    event.preventDefault();
  };

  const handleSkipNavigationKeydown = (event: React.KeyboardEvent<HTMLAnchorElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      focusOnMainContent();
      event.preventDefault();
    }
  };

  const focusOnMainContent = (): void => {
    const mainContent = document.getElementById('main-content') as HTMLElement | null;
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });

      const firstFocusableElement = mainContent.querySelector('a, button, input, textarea, select');
      if (firstFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
      } else {
        const firstChildElement = mainContent.firstChild as HTMLElement | null;
        if (firstChildElement) {
          const styles = {
            outline: '2px solid blue',
            outlineOffset: '2px',
          }
          firstChildElement.style.outline = styles.outline;
          firstChildElement.style.outlineOffset = styles.outlineOffset;
        }
      }
    }
  }

  return (
    <>
      <Link
        href="#main-content"
        id="navigation-skip-link"
        onClick={handleSkipNavigationClick}
        onKeyDown={handleSkipNavigationKeydown}
      >Skip navigation link</Link>
      <nav>
        <ul>
          {renderSearch()}
          {renderNavigationLinks()}
        </ul>
      </nav>
    </>
  );
};
