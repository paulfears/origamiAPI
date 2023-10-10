const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // your server-side functionality
    // data-to-sign = "metamask create federation";
    const proof = event.body.proof;
    console.log("proof");
    const data = {
        "username": "TEST1",
        "domain": "metastellar.io",
        "account_id": "GB2O6R5JUJGJNXN6MD3TNBL4XJU2PFCK7YTWZJXYOR6OBEE2E46MIYEM",
        "memo_type": "text",
        "memo": "string"
      }

    return {'statusCode': 200,
      'headers': {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
      },
      'body': JSON.stringify({"proof":proof})
  }  
  };
  
  export { handler };