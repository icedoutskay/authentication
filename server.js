const http = require('http');
const url = require('url');
const querystring = require('querystring');


 const users = {
   'john doe': 'johndoe123',
   'bola aminu': 'aminu459',
  };

  const authenticate = (req) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return false;
    }
  
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
  
    return users[username] === password;
  };

  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const queryParams = parsedUrl.query;

    if (!authenticate(req)) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Authentication Required"' });
      res.end('Authentication required');
      return;
    }
//END POINTS FOR /BOOKS
if (pathname.startsWith('/books')) {
  let message = '';

  if (req.method === 'GET') {
    message = 'GET Books endpoint';
  } else if (req.method === 'POST') {
    message = 'POST Books endpoint';
  } else if (req.method === 'PUT') {
    message = 'PUT Books endpoint';
  } else if (req.method === 'PATCH') {
    message = 'PATCH Books endpoint';
  } else if (req.method === 'DELETE') {
    message = 'DELETE Books endpoint';
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}
    

//END POINTS FOR /AUTHORS
if (pathname.startsWith('/authors')) {
  let message = '';

  if (req.method === 'GET') {
    message = 'GET Authors endpoint';
  } else if (req.method === 'POST') {
    message = 'POST Authors endpoint';
  } else if (req.method === 'PUT') {
    message = 'PUT Authors endpoint';
  } else if (req.method === 'PATCH') {
    message = 'PATCH Authors endpoint';
  } else if (req.method === 'DELETE') {
    message = 'DELETE Authors endpoint';
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message }));
}
  
  });
  
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
