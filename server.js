const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();

  const handleRedirect =  (req, res) =>{
    const targetUrl = "/feeds/top";
    res.redirect(targetUrl);
  }

  server.get('/sw.js', (req,res)=>{
    app.serveStatic(req, res, path.resolve('./static/sw.js'));
  });

  //server.get('/', handleRedirect);

  server.get('/feeds/:type', (req, res) => {
    const actualPage = '/feeds'
    const queryParams = { type: req.params.type } 
    app.render(req, res, actualPage, queryParams)
  });

  server.get('/user/:id', (req, res) => {
    const actualPage = '/user'
    const queryParams = { type: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  });

  server.get('/feed/:id', (req, res) => {
    const actualPage = '/feed'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  });
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})