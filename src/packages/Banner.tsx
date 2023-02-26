import * as React from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

// Icons
import type { IconType } from "react-icons/lib";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { BsInfoCircle } from "react-icons/bs";

type NonNullableProps<T> = {
  [P in keyof T]-?: Exclude<T[P], null | undefined>;
};

const bannerStyles = cva("w-full py-2", {
  variants: {
    variant: {
      default: ["bg-gray-50"],
      warning: ["bg-yellow-400"],
      approve: ["bg-green-500"],
      error: ["bg-red-500"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BannerCvaProps = VariantProps<typeof bannerStyles>;
type NonNullableCva = NonNullableProps<VariantProps<typeof bannerStyles>>;

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, BannerCvaProps {
  text: React.ReactNode | string;
  action?: "close" | "button" | "verify";
  icon?: IconType;
  button?: JSX.Element | string;
  onClose?: () => void;
  onButtonClick?: () => void;
  onVerifyClick?: () => void;
  className?: string;
}

const BANNER_ICONS: Record<NonNullableCva["variant"], IconType> = {
  default: BsInfoCircle,
  approve: AiOutlineCheckCircle,
  warning: IoWarningOutline,
  error: RxCrossCircled,
};

function getAction({ action, button, variant, onClose, onButtonClick, onVerifyClick }: Omit<BannerProps, "text">) {
  if (action === "button" && typeof button === "string") {
    return (
      <button
        type="button"
        onClick={onButtonClick}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-black"
      >
        {button}
      </button>
    );
  }

  if (action === "verify" && typeof button === "string") {
    return (
      <button
        type="button"
        onClick={onVerifyClick}
        className="rounded-md border border-gray-300 bg-purple-600 px-3 py-2 text-xs font-semibold text-white"
      >
        {button}
      </button>
    );
  }

  if (action === "close") {
    return (
      <button type="button" onClick={onClose} className="flex h-6 w-6 items-center justify-center hover:opacity-50">
        <AiOutlineClose className={variant === "warning" || variant === "default" ? `text-black` : `text-white`} />
      </button>
    );
  }

  return button;
}

export default function Banner({
  variant = "default",
  text,
  icon,
  action,
  button,
  onClose,
  onButtonClick,
  onVerifyClick,
  className,
  ...props
}: BannerProps) {
  const Icon = icon || BANNER_ICONS[variant ?? "default"];

  const Action = getAction({
    action,
    button,
    variant,
    onClose,
    onButtonClick,
    onVerifyClick,
  });

  return (
    <div className={bannerStyles({ variant, className })} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="shrink-0">
            <Icon
              className={cx(variant === "warning" || variant === "default" ? `text-black` : `text-white`)}
              height={24}
              width={24}
            />
          </div>
          <div
            className={cx([
              "grow text-body-regular-sm",
              variant === "warning" || variant === "default" ? `text-black` : `text-white`,
            ])}
          >
            {text}
          </div>
        </div>

        <div className="shrink-0">{Action}</div>
      </div>
    </div>
  );
}
