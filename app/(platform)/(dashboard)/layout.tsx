import { Navbar } from "./_components/navbar";

const DasboradLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
};

export default DasboradLayout;
