import React from "react";

const CallbackStatus = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <p className="col-2">onReady</p>
        {props.onReady ? (
          <p className="col-1">✅</p>
        ) : (
          <p className="col-1"></p>
        )}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onShow</p>
        {props.onShow ? <p className="col-1">✅</p> : <p className="col-1"></p>}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onShown</p>
        {props.onShown ? (
          <p className="col-1">✅</p>
        ) : (
          <p className="col-1"></p>
        )}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onSuppress</p>
        {props.onSuppress ? (
          <p className="col-1">✅</p>
        ) : (
          <p className="col-1"></p>
        )}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onCompleted</p>
        {props.onCompleted ? (
          <p className="col-1">✅</p>
        ) : (
          <p className="col-1"></p>
        )}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onHide</p>
        {props.onHide ? <p className="col-1">✅</p> : <p className="col-1"></p>}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onReset</p>
        {props.onReset ? (
          <p className="col-1">✅</p>
        ) : (
          <p className="col-1"></p>
        )}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onError</p>
        {props.onError ? (
          <p className="col-1">✅</p>
        ) : (
          <p className="col-1"></p>
        )}
      </div>
      <div className="row justify-content-center">
        <p className="col-2">onFailed</p>
        {props.onFailed ? (
          <p className="col-1">✅</p>
        ) : (
          <p className="col-1"></p>
        )}
      </div>
    </div>
  );
};

export default CallbackStatus;
