import Header from "@/components/legal-advisor/Header";
import Footer from "@/components/legal-advisor/Footer";

const LegalAdvisorLayout = ({ children }: { children: React.ReactNode }) => {
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
};
export default LegalAdvisorLayout;
