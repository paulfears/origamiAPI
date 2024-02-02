import { returnResponse } from '../../functionUtils';
import { MongoClient, ServerApiVersion } from 'mongodb';
import {Keypair} from 'stellar-base';
import {Handler, HandlerEvent, HandlerContext, HandlerResponse} from "@netlify/functions"
const uri = `mongodb+srv://Paul:${process.env.PWD}@cluster0.o5w5kud.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DB {
    client;
    constructor(uri){
        this.client = new MongoClient(
            uri, 
            {serverApi: {version: ServerApiVersion.v1,strict: true, deprecationErrors: true}} //ts error that dosen't matter
        );

    }
    async  connect(){
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } 
        catch {
           this.close();
        }
        return this;
    }

    async close(){
        await this.client.close();
    }

}

function verify(test, proof, address){
    const testBuf = Buffer.from(Buffer.from(test).toString());
    const proofBuf = Buffer.from(proof);
    const verifier = Keypair.fromPublicKey(address);
    if(!verifier.verify(test, Buffer.from(proof))){
        console.log("failed verification");
        //return returnResponse(403, {"error":"proof did not match", "ok":false, "code":403})
    }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    const body = JSON.parse(event.body);
    const test = Buffer.from(Buffer.from("dbStoreage").toString());
    console.log(Buffer.from(body.proof));
    const proof = body.proof;
    const address = body.address;
    
    
    if(!verifier.verify(test, Buffer.from(proof))){
        console.log("failed verification");
        //return returnResponse(403, {"error":"proof did not match", "ok":false, "code":403})
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
      return {'statusCode': 200,
          'headers': {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
          },
          'body': JSON.stringify({"hello":"world"})
      }    
  };
  
  export { handler };