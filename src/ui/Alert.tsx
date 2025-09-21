import { styled } from "@/styles/jsx";
import { RecipeVariantProps, WithCss } from "@/styles/types";
import { cva, cx } from "@/styles/css";

const alertStyles = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1",
    p: "2",
    border: "1px solid",
    borderRadius: "md",
    fontSize: "sm",
    transition: "all 150ms ease",
  },
  variants: {
    variant: {
      default: {
        bg: "alert.default.bg",
        color: "alert.default.text",
        borderColor: "alert.default.border",
      },
    },
  },
});

type AlertVariantProps = RecipeVariantProps<typeof alertStyles>;

type AlertProps = React.PropsWithChildren<AlertVariantProps & WithCss>;

export const Alert: React.FC<AlertProps> = ({
  variant = "default",
  children,
  css,
  ...props
}) => {
  return (
    <styled.div className={cx(alertStyles({ variant }))} css={css} {...props}>
      {children}
    </styled.div>
  );
};
