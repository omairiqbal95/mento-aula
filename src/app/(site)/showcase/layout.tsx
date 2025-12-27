import Header from "@/components/showcase/Header";

const ShowcaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};
export default ShowcaseLayout;
