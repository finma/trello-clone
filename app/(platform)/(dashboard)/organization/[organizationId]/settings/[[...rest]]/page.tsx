import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            cardBox: {
              border: "1px solid #e5e5e5",
              width: "100%",
              boxShadow: "none",
            },
            navbar: {
              background: "white",
            },
            navbarMobileMenuRow: {
              background: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;
