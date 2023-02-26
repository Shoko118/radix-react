import Banner from "./packages/Banner";
import { HiOutlineMinusCircle } from "react-icons/hi";
import Button from "./packages/Button";
import ToggleButton from "./packages/Toggle";

function App() {
  function handleOnClose() {}
  function handleVerifyClick() {}
  function handleButtonClick() {}

  return (
    <div>
      <h1>Radix and cva React</h1>
      <Banner
        action="close"
        onClose={handleOnClose}
        variant="approve"
        text="Unstable internet connection. Please refresh your browser or try again later."
      />

      <Banner variant="warning" text="Unstable internet connection. Please refresh your browser or try again later." />

      <Banner
        variant="error"
        icon={HiOutlineMinusCircle}
        onVerifyClick={handleVerifyClick}
        action="verify"
        button="Verify"
        text="Unstable internet connection. Please refresh your browser or try again later."
      />
      <Banner
        action="button"
        onButtonClick={handleButtonClick}
        button="Button"
        text="Unstable internet connection. Please refresh your browser or try again later."
      />

      <h1>Button section</h1>
      <Button intent={"primary"} size={"medium"}>
        Button
      </Button>
      <ToggleButton bgColor="blue" title="Button" setBgColor={`data-[state="on"]:bg-red-400`} />
    </div>
  );
}

export default App;
