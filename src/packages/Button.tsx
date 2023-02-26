import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button", {
  variants: {
    intent: {
      primary: ["bg-blue-500", "text-white", "border-transparent", "hover:bg-blue-600"],
      secondary: ["bg-red-300", "text-gray-800", "border-gray-400", "hover:bg-gray-100"],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

export default function Button(props: ButtonProps) {
  const { intent, size, children } = props;

  return (
    <button className={button({ intent, size })} {...props}>
      {children}
    </button>
  );
}
