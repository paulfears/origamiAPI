import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
  console.log("here");
  const json_data = {
    "hello":"world"
  }
    return {'statusCode': 200,
        'headers': {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
        },
        'body': json_data
    }    
};

export { handler };