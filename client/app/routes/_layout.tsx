import { Outlet } from "react-router";
// import { Header } from "~/components/layout/Header";
// import { Footer } from "~/components/layout/Footer";

/**
 * Main Layout
 * 
 * Wraps all pages with Header and Footer.
 * Uncomment the imports when you've created your layout components.
 */
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
