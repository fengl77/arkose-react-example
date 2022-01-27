import { useState } from "react";
import ArkoseLabs from "./Components/ArkoseLabs";
import CallbackStatus from "./Components/CallbackStatus";

const App = () => {
  // State to hold the token returned by the Arkose Labs API
  const [token, setToken] = useState("");

  // State to identify when Arkose Callbacks have been called
  const [onReady, setOnReady] = useState(false);
  const [onShow, setOnShow] = useState(false);
  const [onShown, setOnShown] = useState(false);
  const [onSuppress, setOnSuppress] = useState(false);
  const [onCompleted, setOnCompleted] = useState(false);
  const [onHide, setOnHide] = useState(false);
  const [onReset, setOnReset] = useState(false);

  // Create the setup function that the Arkose Labs API will use to configure it's use
  // and the callbacks that it will trigger
  function setupEnforcement(enforcementObject) {
    window.Arkose = enforcementObject;
    window.Arkose.setConfig({
      selector: "#arkose-ec",
      mode: "modal",
      onReady: () => {
        setOnReady(true);
      },
      onShown: () => {
        setOnShown(true);
      },
      onShow: () => {
        setOnShow(true);
      },
      onSuppress: () => {
        setOnSuppress(true);
      },
      onCompleted: (response) => {
        setOnCompleted(true);
        setToken(response.token);
      },
      onReset: () => {
        setOnReset(true);
      },
      onHide: () => {
        setOnHide(true);
      },
    });
  }

  // Make the setup function a global variable so that the Arkose Labs API can run it
  // once the API has loaded. The name of this variable MUST match the name of the setup
  // function defined in the ArkoseLabs component 'data-callback' attribute
  window.setupEnforcement = setupEnforcement;

  // Reset state so the trigger button can be pressed more than once to run Arkose and still shown
  // the correct callbacks that are run
  const handleOnClick = () => {
    setOnShow(false);
    setOnShown(false);
    setOnSuppress(false);
    setOnCompleted(false);
    setOnHide(false);
    setOnReset(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <button
          id="arkose-ec"
          className="btn btn-primary col-2 my-5"
          onClick={handleOnClick}
        >
          Run Arkose
        </button>
      </div>
      <div className="row">
        <h3 className="text-center my-3">Callback Status</h3>
      </div>
      <CallbackStatus
        onReady={onReady}
        onShow={onShow}
        onShown={onShown}
        onSuppress={onSuppress}
        onCompleted={onCompleted}
        onReset={onReset}
        onHide={onHide}
      />
      <div className="row">
        <h3 className="text-center my-3">Arkose Labs Token</h3>
      </div>
      <div className="row justify-content-center">
        <p className="col-6">{token}</p>
      </div>
      <div className="row justify-content-center">
        <ArkoseLabs privateKey={"11111111-1111-1111-1111-111111111111"} />
      </div>
    </div>
  );
};

export default App;
