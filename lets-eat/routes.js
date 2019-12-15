const cont = require('./controller');

module.exports = app => {
  //Restaurant
    app.get('/rests',cont.restaurant.get);
    app.get('/rests/:id',cont.restaurant.getOne);
    app.post('/rests',cont.restaurant.create);
    app.put('/rests/:id',cont.restaurant.update);
    app.delete('/rests/:id',cont.restaurant.delete);

  //Review
    app.post('/rests/:id/reviews',cont.review.create);
  
  //Catch-all
    app.all("*", (req,res,next) => {
    res.sendFile(__dirname + "/public/dist/public/index.html");
  });
}