const http = require("http")
const server = http.createServer((req, res) => {
    if (req.method == "GET" && req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end("SUCCESS!")
    }
})

server.listen(3000, () => {
    console.log("running on port 3000")
})