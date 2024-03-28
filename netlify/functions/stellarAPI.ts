import nacl from 'tweetnacl';
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import * as StellarSdk from '@stellar/stellar-sdk';

async function postData(url, data = {}) {
    // Default options are marked with *
    console.log("token is");
    console.log(process.env.STELLARIDAPIKEY);
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "Authorization": (process.env.STELLARIDAPIKEY as string),
        "accept": "application/json"
      },
      redirect: "follow", // manual, *follow, error// no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log("response.ok is: ");
    console.log(response.ok);
    console.log("response body is");
    console.log(response.body);
    console.log("response status is");
    console.log(response.status);
    console.log("status text is");
    console.log(response.statusText);
    const output = await response.json(); // parses JSON response into native JavaScript objects
    console.log("output is");
    console.log(output);
    return output;
  }

/**
 * 
 * address -> string
 * proof -> Keypair.sign('createaccount').toString()
 * username -> string
 * 
 */

interface auth{
  pk:string, //hexString
  address:string, //stellar address
  proof:string //signed item 
}
function handleAuth(auth:auth, testKey):boolean{
  function verifySig(data:Buffer, signature:string, publicKey:string):boolean{
    const signatureBuf = Buffer.from(signature, 'hex');
    const publicKeyBuf = Buffer.from(publicKey, 'hex');
    const uIntsignature = new Uint8Array(signatureBuf.toJSON().data);
    const uIntpublicKey = new Uint8Array(publicKeyBuf.toJSON().data);
    const uIntdata = new Uint8Array(data.toJSON().data);
    return nacl.sign.detached.verify(uIntdata, uIntsignature, uIntpublicKey);
  };
  function  prepairTest(data:string):Buffer{
        const dataHex = Buffer.from(data).toString('hex');
        const safty = Buffer.from("__challenge__").toString('hex');
        //this is done so an evil server couldn't use this function to sign a valid transaction
        const prepaired = Buffer.from(safty+dataHex, 'hex');
        return prepaired;
  }
  const test = prepairTest(testKey);

  return verifySig(test, auth.proof, auth.pk);

}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
   
    const endpoint = event.path.slice("/.netlify/functions/stellarAPI/".length)
    const method = event.httpMethod;
    const response = await fetch("https://autumn-proportionate-breeze.stellar-mainnet.quiknode.pro/"+endpoint, {
        method:method,
        body:event.body
    })
    
    if (event.httpMethod == "OPTIONS") {
        console.log("IF OPTIONS");

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
            },
        };
        }
    
    console.log(response);
    const responseJson = await response.json();
    console.log(responseJson);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
        },
      body: JSON.stringify(responseJson),
      statusCode: 200,
    }
      
  };
  
  export { handler };