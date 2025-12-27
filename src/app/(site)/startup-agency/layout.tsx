import Header from "@/components/startup-agency/Header";
import StartupAgencyFooter from "@/components/startup-agency/Footer";

export default function StartupAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="smooth-wrapper">
        <Header />
        <div id="smooth-content">
          <main>{children}</main>
          <StartupAgencyFooter />
        </div>
      </div>
    </>
  );
}
