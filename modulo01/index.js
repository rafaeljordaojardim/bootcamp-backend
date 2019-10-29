const express = require('express');

const server = express();

server.use(express.json());
//query params = ?teste=1
//route params = /users/1
//request body = { "name":"rafael"} payload

const users = ['Diego', 'Robson', 'Rafael'];

//if there is no next, the request will get blocked, we have to put next to continue the flux
server.use((req, res, next) => {
    console.time('Request')
    console.log(`Method: ${req.method}; Url: ${req.url}`);
    next();//calls the next middlware and after come back here to execute the rest of the code
    console.timeEnd('Request');
    console.log('End');
    
});
function checkUserInArray(req, res, next) {
    const user = users[req.params.index];
    if (!user) {
        return res.status(400).json({error:'User doesn\'t exists'});
    }
    req.user = user;
    return next();
}
function checkUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({error:'User name is required'});
    }

    return next();
}

server.get('/users', (req, res) => {
    console.log('Users');
    
    return res.json(users);
});


server.get('/users/:index', checkUserInArray, (req, res) => {
    // const { index } = req.params;
    return res.json(req.user);
});


server.post('/users', checkUserExists, (req, res) => {
    const {name} = req.body;

    users.push(name);

    return res.json(users);
});

server.patch('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;
   
    users.splice(index, 1);

    return res.send();
});
server.listen(3000);