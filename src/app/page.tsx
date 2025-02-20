import { NavBar } from "./components/NavBar/NavBar";

import styles from "./page.module.css";

/**
 * Welcome page; authenticated & unauthenticated users can search for books here from the google books api
 * It would be cool to add a section of New Releases, Top Rated, etc.
 */
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavBar />
        Hello
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
