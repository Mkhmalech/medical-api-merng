import http from 'http';

export const requestData = (path: string, query: string, callback: (data: string)=>void) => {

    const options = {
        "method": "POST",
        "hostname": "localhost",
        "port": "8060",
        "path": "/"+path,
        "headers": {
            "Accept": "*/*",
            "User-Agent": "Ittyni parapharmacy service",
            "Content-Type": "application/json"
        }
    };

    let response : string ='';

    const req = http.request(options, async function (res: any) {
        const chunks: any[] = [];

        res.on("data", function (chunk: any) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            callback(body.toString());
        })
    });


    let gqlBody = {
        query: query,
        variables: { "_id": "5e4ac28a714f5537a4863f12" }
    }

    let bodyContent = JSON.stringify(gqlBody);

    req.write(bodyContent);
    req.end();
}