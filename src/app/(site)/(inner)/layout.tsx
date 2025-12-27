import FooterDefault from "@/components/common/FooterDefault";
import Header from "@/components/common/Header";

function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>{children}</main>
          <FooterDefault />
        </div>
      </div>
    </>
  );
}
export default ServiceLayout;
