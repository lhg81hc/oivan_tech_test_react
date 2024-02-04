import { ModalRoot } from "@/components/modal";

export default function PublicLayout({ children }) {
  return (
    <>
      {children}
      <ModalRoot />
    </>
  );
}
