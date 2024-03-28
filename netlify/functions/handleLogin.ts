import {Handler, HandlerEvent, HandlerContext, HandlerResponse} from "@netlify/functions"
function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload)
  }
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    console.log("event is ");
    console.log(event);
    console.log("context is ");
    console.log(context);
    console.log("event body is");
    console.log(event.body);
    const data = new URLSearchParams(event.body);
    let credentials = decodeJwtResponse(data.get('credential'));
    console.log(credentials);
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