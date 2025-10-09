const http = require('http');

//definir a porta na qual o servidor irá escutar as requisições
const PORT = 3000;

const servidor = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});

    response.end(`
        <html>
        <head>
            <title>Meu primeiro servidor</title>
        </head>
        <body> 
            <header>
                <h1>Hello World!</h1>
            </header>
            <main>
                <p>Meu primeiro servidor web</p>
                <p>Url acessada: ${request.url}</p>
                <p>Método http: ${request.method}</p>
                <p>Hora atual: ${new Date().toLocaleString()}</p>
            </main>
        </body>
        </html>
    `)
})

servidor.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})

