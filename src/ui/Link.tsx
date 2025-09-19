import { styled } from "@/styles/jsx";
import { WithCss } from "@/styles/types";

export type LinkProps = React.PropsWithChildren<
  {
    href: string;
  } & WithCss
>;

export const Link: React.FC<LinkProps> = ({ href, children, css }) => {
  return (
    <styled.a href={href} css={css} color="link" fontWeight="bold">
      {children}
    </styled.a>
  );
};
