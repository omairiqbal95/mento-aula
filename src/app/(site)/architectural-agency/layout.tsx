import Footer from "@/components/architectural-agency/Footer";
import Header from "@/components/architectural-agency/Header";

export default function ArchitecturalAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
