const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    const proof = event.body.proof;
    console.log("proof");
    const json_data = {
      "hello":"world",
      "postproof": proof,
      "body":event.body
    }
      return {'statusCode': 200,
          'headers': {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
          },
          'body': JSON.stringify(json_data)
      }    
  };
  
  export { handler };