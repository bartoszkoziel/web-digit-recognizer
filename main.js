const http = require("http")
const fs = require("fs")
const logger = require("tracer").colorConsole()

const server = http.createServer((req, res) => {
    if (req.method == "GET" && req.url == "/") {
        mainpage = fs.readFileSync('./index.html')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(mainpage)
        logger.info("GET /")
    }

    else if (req.method == "GET" && req.url == "/script.js"){
        mainpage = fs.readFileSync('./script.js')
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
        res.end(mainpage)
        logger.info("GET /script.js")
    }

    else if (req.method == "GET" && req.url == "/styles.css") {
        mainpage = fs.readFileSync('./styles.css')
        res.writeHead(200, { 'Content-Type': 'text/css' })
        res.end(mainpage)
        logger.info("GET /styles.css")
    }

    else if (req.method == "POST" && req.url == "/handleUpload") {
        let body = ''
        req.on('data', (data) => {
            body += data
        })

        req.on('end', () => {
            try {
                var post = JSON.parse(body);
                // deal_with_post_data(request,post);
                logger.info(post); // <--- here I just output the parsed JSON
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("TEMP RESPONSE");
                return;
              }catch (err){
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write("Bad Post Data.  Is your data a proper JSON?\n");
                res.end();
                return;
              }
        })
    }
})

server.listen(3000, () => {
    console.log("running on port 3000")
})