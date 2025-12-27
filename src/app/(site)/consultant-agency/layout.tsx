import Footer from "@/components/consultant-agency/Footer";
import Header from "@/components/consultant-agency/Header";

const ConsultantAgencyLayout = ({
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
export default ConsultantAgencyLayout;
