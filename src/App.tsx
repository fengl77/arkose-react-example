import React from 'react';
import ArkoseLabs from "./components/arkose-labs/ArkoseLabs"
import Login from './components/Login';

function App() {

  /**
   * Called when the Arkose Labs API has been loaded fully
   */
  const onReady = () => {
    console.log('onReady');
  }

  /**
   * Called when the session challenge is suppressed OR completed successfully 
   * @param token Token provided by Arkose Labs API
   */
  const onCompleted = (response: any) => {
    console.log(response);
    alert(response.token);
  }

  /**
   * Called when the session challenge is shown
   */
     const onShown = () => {
      console.log("onShown");
  }

  /**
   * Called when the session challenge is suppressed
   */
  const onSuppress = () => {
    console.log("onSuppress");
  }

  /**
   * Called when the session is reset
   */
     const onReset = () => {
      console.log("onReset");
  }

  /**
   * Called when the session challenge is hidden
   */
  const onHide = () => {
    console.log("onHide");
  }

  return (
    <div>
      <div style={{ margin: 'auto', width: '300px' }}>
        <ArkoseLabs 
          mode={'lightbox'}
          selector={"arkose"}
          publicKey={'11111111-1111-1111-1111-111111111111'} 
          onCompleted={onCompleted} 
          onReady={onReady} 
          onShown={onShown}
          onSuppress={onSuppress}
          onReset={onReset}
          onHide={onHide}
          scriptProps={
            {
              defer: true,
              async: true,
              appendTo: 'head',
              id: "arkose-api-script"
            }
          }
          />
      </div>
      <Login />
    </div>
  );
}

export default App;
