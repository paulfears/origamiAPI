import {Keypair} from 'stellar-base';
import { returnResponse } from '../../functionUtils';
import nacl from 'tweetnacl';




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
    const output = await response.text(); // parses JSON response into native JavaScript objects
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
const verifySig = (data, signature, publicKey) => {
  data = Buffer.from(data);
  data = new Uint8Array(data.toJSON().data);
  signature = new Uint8Array(signature.toJSON().data);
  publicKey = new Uint8Array(publicKey.toJSON().data);
  return nacl.sign.detached.verify(data, signature, publicKey);
};
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    const body = JSON.parse(event.body);
    const test = Buffer.from("createaccount");
    const proofBuf = Buffer.from(body.proof, 'hex');
    console.log("test");
    console.log(test);
    console.log("sig");
    console.log(body.proof);
    console.log("sig buffer");
    console.log(proofBuf);
    const proof = body.proof;
    const address = body.address;
    const pk = body.pk;
    console.log("address is");
    console.log(address);
    const verifier = verifySig("createaccount", proofBuf, Buffer.from(pk, "hex"));
    console.log("verifer is");
    console.log(verifier);
    console.log("running verifier");
    if(!verifier){
        console.log("failed verification");
        return returnResponse(403, {"error":"proof did not match", "ok":false, "code":403})
    }
    console.log("body username is: ");
    console.log(body.username);
    console.log("body.address is: ")
    console.log(body.address);
    const params = {
        "username": body.username,
        "domain": "metastellar.io",
        "account_id": body.address,
      }
    const url = "https://stellarid.io/api/addresses/"
    const response = await postData(url, params)
    console.log("response is");
    console.log(response);
    const data = response;
      return {'statusCode': 200,
          'headers': {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
          },
          'body': JSON.stringify(data)
      }    
  };
  
  export { handler };