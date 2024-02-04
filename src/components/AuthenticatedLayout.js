import { ModalRoot } from "@/components/modal";
import Nav from "@/components/Nav";

export default function AuthenticatedLayout({ children }) {

  return (
    <>
      <Nav />
      <main className="flex justify-center items-center bg-gray-50">
        {children}
      </main>
      <footer>This is the footer</footer>
      <ModalRoot />
    </>
  );
}
