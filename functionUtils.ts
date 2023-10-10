export function returnResponse(code, body){
    return {'statusCode': code,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE, OPTIONS'
        },
        'body': JSON.stringify(body)
    }    
}