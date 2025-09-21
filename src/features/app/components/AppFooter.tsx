import { styled } from "@/styles/jsx";
import { PrivacyPolicy } from "@@/privacy-policy";
import { Why } from "@@/why";

export const AppFooter: React.FC = () => {
  return (
    <styled.div display="flex" alignItems="center" justifyContent="center">
      <Why />
      <PrivacyPolicy />
    </styled.div>
  );
};
