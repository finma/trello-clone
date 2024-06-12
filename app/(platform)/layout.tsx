import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  // return <>{children}</>;
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
