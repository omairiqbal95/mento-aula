import Footer from "@/components/fitness/Footer";
import Header from "@/components/fitness/Header";

const FitnessLayout = ({ children }: { children: React.ReactNode }) => {
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

export default FitnessLayout;
