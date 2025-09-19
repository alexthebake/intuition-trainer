import { cva, cx } from "@/styles/css";
import { styled } from "@/styles/jsx";
import { RecipeVariantProps, WithCss } from "@/styles/types";

// Button variants using CVA
const buttonStyles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    border: "1px solid",
    borderRadius: "md", // 6px
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
    shadow: "md",
    _disabled: {
      cursor: "not-allowed",
      bg: "button.disabled.bg",
      color: "button.disabled.text",
      borderColor: "button.disabled.border",
      shadow: "none",
      _hover: {
        bg: "button.disabled.bg",
      },
    },
  },
  variants: {
    variant: {
      primary: {
        border: "1px solid",
        borderColor: "button.primary.border",
        bg: "button.primary.bg",
        color: "button.primary.text",
        _hover: { bg: "button.primary.hover" },
      },
      secondary: {
        border: "1px solid",
        borderColor: "button.secondary.border",
        bg: "button.secondary.bg",
        color: "button.secondary.text",
        _hover: { bg: "button.secondary.hover" },
      },
      danger: {
        border: "1px solid",
        borderColor: "transparent",
        bg: "button.danger.bg",
        color: "button.danger.text",
        _hover: {
          bg: "button.danger.hover",
          color: "button.danger.hover.text",
        },
      },
    },
    size: {
      xs: {
        px: "3",
        py: "1.5",
        fontSize: "xs",
        "& svg": {
          width: "4",
          height: "4",
        },
      },
      sm: {
        px: "4",
        py: "2",
        fontSize: "sm",
        "& svg": {
          width: "5",
          height: "5",
        },
      },
      md: {
        px: "6",
        py: "3",
        fontSize: "md",
        "& svg": {
          width: "6",
          height: "6",
        },
      },
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "sm",
  },
});

type ButtonHTMLProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonVariantProps = RecipeVariantProps<typeof buttonStyles>;

type ButtonProps = React.PropsWithChildren<
  ButtonHTMLProps & ButtonVariantProps & WithCss
>;

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "sm",
  className,
  children,
  css,
  ...props
}) => {
  return (
    <styled.button
      className={cx(buttonStyles({ variant, size }), className)}
      css={css}
      {...props}
    >
      {children}
    </styled.button>
  );
};
