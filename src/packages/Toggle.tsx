import * as Toggle from "@radix-ui/react-toggle";
import { cx } from "class-variance-authority";

interface IProps {
  bgColor: `white` | `blue`;
  title: string;
  setBgColor?: string;
}

export default function ToggleButton(props: IProps) {
  const { bgColor, title, setBgColor } = props;

  return (
    <div>
      <Toggle.Root
        className={cx(
          "rounded-md p-3 ",
          bgColor === `white` ? `bg-white` : `bg-blue-400`,
          setBgColor ? setBgColor : `data-[state="on"]:bg-pink-400`
        )}
      >
        <p className="font-semibold text-2xl">{title}</p>
      </Toggle.Root>
    </div>
  );
}
