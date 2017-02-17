module.exports = function (app) {
  /**
   * I can start putting my routing middlewares here
   */
  app.get('/',(req, res, next)=>{
    console.log('reqdze',req.body, req.fields, req.files)
    res.status(200)
      .format({
        html: _ => res.send('<p>It works!</p>'),
        text: _ => res.send('It works!'),
        json: _ => res.json({message: 'It works!'})
      })
  })

  return app
}
