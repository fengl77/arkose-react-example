import React from "react";
import { ArkoseLabsAccessibility, ArkoseLabsData } from "../../Types/ArkoseLabsTypes";

type ArkoseLabsProps = {
  publicKey: string;
  selector?: string;
  language?: string;
  mode?: 'lightbox' | 'inline';
  accessibility?: ArkoseLabsAccessibility;
  data?: ArkoseLabsData;
  onCompleted: (token: string) => void;
  onReady?: () => void;
  onFailed?: (token: string) => void;
  onHide?: () => void;
  onShow?: () => void;
  onShown?: () => void;
  onSuppress?: () => void;
  onReset?: () => void;
  scriptProps: {
    defer?: boolean;
    async?: boolean;
    appendTo?: 'head' | 'body';
    id?: string;
  }
};

const ARKOSE_LABS_SETUP_SCRIPT_ID = 'arkose-labs-setup';
const ARKOSE_LABS_API = 'arkose-labs-api'
const ARKOSE_LABS_DATA_CALLBACK = 'setupArkoseLabs';
const ARKOSE_LABS_HOSTNAME = 'client-api.arkoselabs.com';
const ARKOSE_LABS_API_SCRIPT_NAME = 'api.js';
const ARKOSE_LABS_API_VERSION = 'v2';

/**
 * Function that injects the Arkose Labs API and setup scripts based on the props passed in. If the scripts have already
 * been injected then they will not be injected a second time.
 * @param props Properties defined within the ArkoseLabsProp type
 * @returns DIV tag to contain the injected Arkose Labs challenge should one be necessary
 */
function ArkoseLabs(props: ArkoseLabsProps) {

  const scriptParentElement = props.scriptProps.appendTo === 'body' ? document.body : document.getElementsByTagName('head')[0];

    // Create a function that will be injected into the DOM in a script tag that will configure the Arkose Labs API
    if (!isScriptInjected(ARKOSE_LABS_SETUP_SCRIPT_ID)) {
    const arkoseSetupScript = document.createElement('script');

    arkoseSetupScript.id = ARKOSE_LABS_SETUP_SCRIPT_ID;
    arkoseSetupScript.innerHTML = `function setupArkoseLabs(myEnforcement) { myEnforcement.setConfig({`;
    arkoseSetupScript.innerHTML += `onCompleted: ${props.onCompleted}`;
    if (props.selector) { arkoseSetupScript.innerHTML += `, selector: '#${props.selector}'`; }
    if (props.language) { arkoseSetupScript.innerHTML += `, language: '${props.language}'`; }
    if (props.mode) { arkoseSetupScript.innerHTML += `, mode: '${props.mode}'`; }
    if (props.accessibility) { arkoseSetupScript.innerHTML += `, accessibility: { '${props.accessibility.key}: '${props.accessibility.value}' }`; }
    if (props.data) { arkoseSetupScript.innerHTML += `, data: { '${props.data.key}': '${props.data.value}' }`; }
    if (props.onReady) { arkoseSetupScript.innerHTML += `, onReady: ${props.onReady}`; }
    if (props.onFailed) { arkoseSetupScript.innerHTML += `, onFailed: ${props.onFailed}`; }
    if (props.onHide) { arkoseSetupScript.innerHTML += `, onHide: ${props.onHide}`; }
    if (props.onShow) { arkoseSetupScript.innerHTML += `, onShow: ${props.onShow}`; }
    if (props.onShown) { arkoseSetupScript.innerHTML += `, onShown: ${props.onShown}`; }
    if (props.onSuppress) { arkoseSetupScript.innerHTML += `, onSuppress: ${props.onSuppress}`; }
    if (props.onReset) { arkoseSetupScript.innerHTML += `, onReset: ${props.onReset}`; }
    arkoseSetupScript.innerHTML += `});}`;

    scriptParentElement.appendChild(arkoseSetupScript);
  }

  // Inject a script tag into the DOM that will load the Arkose Labs API
  if (!isScriptInjected(props.scriptProps.id || ARKOSE_LABS_API)) {
    const arkoseApiScriptSrc = _generateArkoseLabsScriptSrc(props.publicKey, ARKOSE_LABS_API_VERSION);
    const arkoseApiScript = document.createElement('script');
    arkoseApiScript.id = props.scriptProps.id || ARKOSE_LABS_API;
    arkoseApiScript.src = `${arkoseApiScriptSrc}`;
    arkoseApiScript.setAttribute('data-callback', ARKOSE_LABS_DATA_CALLBACK)
    arkoseApiScript.defer = !!props.scriptProps.defer;
    arkoseApiScript.async = !!props.scriptProps.async;
    scriptParentElement.appendChild(arkoseApiScript);
  }
  
  return (
    // This div is only displayed if the Arkose API is configured for inline mode in which case any challenge iframe that is displayed
    // will be displayed in this div.
    <div id={props.selector}></div>
  );
}

 /**
 * Function that generates the script src value to load the Arkose Labs API
 * @param publicKey Public key provided by Arkose Labs
 * @param version Version number of the client API to use. Currently only v2 is available
 * @returns URL for the Arkose Labs Client API
 */
  const _generateArkoseLabsScriptSrc = (publicKey: string, version: string) => {
    return `https://${ARKOSE_LABS_HOSTNAME}/${version}/${publicKey}/${ARKOSE_LABS_API_SCRIPT_NAME}`;
  }
  
/**
 * Function that checks if the Arkose Labs script with the supplied ID has already be injected into the DOM
 * 
 * @param scriptId
 * @returns True if the scriptId is found within the DOM
 */
 export const isScriptInjected = (scriptId: string) => !!document.querySelector(`#${scriptId}`);

 export default ArkoseLabs
