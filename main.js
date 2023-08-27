const http = require("http")
const fs = require("fs")
const logger = require("tracer").colorConsole()

const cproc = require("child_process")
const { log } = require("console")

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
                var post = JSON.parse(body)

                let inputstring = ""
                post.forEach(element => {
                    inputstring += element.toString()
                })

                digitRecognition = cproc.spawn('python3.11', ['/home/beczooonia/repos/digit-recognition-with-mnist/dr.py', inputstring])

                let predictions = ""

                digitRecognition.stdout.on('data', (data) => {
                    const output = data.toString();
                    console.log(`Python Output: ${output}`);
                    predictions = output
                })
                  
                // digitRecognition.stderr.on('data', (data) => {
                //     console.error(`Python Error: ${data}`);
                // })
                  
                digitRecognition.on('close', (code, data) => {
                    console.log(`Python process exited with code ${code}`);

                    console.log("FINISH IN A SEC")

                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end(predictions)
                    return
                })

                // res.writeHead(200, {"Content-Type": "text/plain"});
                // res.end(output.toString())
                // return
            } catch (err){
                console.log("tu: ", err)
                res.writeHead(500, {"Content-Type": "text/plain"})
                res.write("Bad Post Data.  Is your data a proper JSON?\n")
                res.end()
                return
            }
        })
    }
})

server.listen(3000, () => {
    console.log("running on port 3000")
})