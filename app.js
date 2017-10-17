const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/ping', (req, res) => {
    res.json({message: "Pong!"});
})

app.get('/bad', (req, res, next) => {
    next("Kaboom!");
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({error: err});
})

app.use((req, res) => {
    res.status(404).json({error: "Page not found."});
})

const listener = () => console.log(`Listening on port ${port}`);
app.listen(port, listener);