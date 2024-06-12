import { OrganizationList } from "@clerk/nextjs";

const CreateOrganizationPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/organization/:id"
      afterSelectOrganizationUrl="/organization/:id"
    />
  );
};

export default CreateOrganizationPage;
