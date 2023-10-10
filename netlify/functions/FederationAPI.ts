const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    console.log("event is ");
    console.log(event);
    console.log("context is ");
    console.log(context);
    console.log("event body is");
    console.log(event.body);
    console.log("here");
    const json_data = {
      "hello":"world",
      "postData": event.body
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