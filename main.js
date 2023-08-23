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
})

server.listen(3000, () => {
    console.log("running on port 3000")
})