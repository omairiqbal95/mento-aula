import Footer from "@/components/healthcare/Footer";
import Header from "@/components/healthcare/Header";

export default function HealthcareLayout({
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
