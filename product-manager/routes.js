const cont = require('./controller');

module.exports = app => {
    app.post('/products/create',cont.create);
    app.get('/products/get',cont.getAll);
    app.get('/products/get/:id',cont.getOne);
    app.put('/products/update/:id',cont.update);
    app.delete('/products/delete/:id',cont.delete);
    app.all("*", (req,res,next) => {
        res.sendFile(__dirname + "/public/dist/public/index.html");
      });
}
