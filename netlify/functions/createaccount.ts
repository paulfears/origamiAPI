import {Keypair} from 'stellar-base';
import { returnResponse } from '../../functionUtils';
async function postData(url, data = {}) {
    // Default options are marked with *

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        "Authorization": (process.env.STELLARIDAPIKEY as string)
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log(response);
    return response; // parses JSON response into native JavaScript objects
  }

/**
 * 
 * address -> string
 * proof -> Keypair.sign('createaccount').toString()
 * username -> string
 * 
 */
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    const body = JSON.parse(event.body);
    const test = Buffer.from("createaccount");
    const proof = body.proof;
    const address = body.address;
    const verifier = Keypair.fromPublicKey(body.address);
    if(!verifier.verify(test, Buffer.from(proof))){
        returnResponse(403, {"error":"proof did not match", "ok":false, "code":403})
    }

    const params = {
        "username": body.username,
        "domain": "metastellar.io",
        "account_id": body.address,
        "memo_type": "none",
      }
    const url = "https://stellarid.io/api/addresses"
    const response = await postData(url, params)
    console.log(response);
    const data = response.body;
    //const data = await response.json();
      return {'statusCode': 200,
          'headers': {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
          },
          'body': JSON.stringify(data)
      }    
  };
  
  export { handler };