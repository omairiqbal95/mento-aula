import Header from "@/components/financial-advisor/Header";
import Footer from "@/components/financial-advisor/Footer";

const FinancialAdvisorLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
export default FinancialAdvisorLayout;
