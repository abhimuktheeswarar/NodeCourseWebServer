const express = require(`express`);
const hbs = require(`hbs`);
const fs = require(`fs`);

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set(`view engine`, `hbs`);

app.use((request, response, next) => {
  let now = new Date().toString();
  let log = `${now}: ${request.method} = ${request.url} \n`;
  console.log(log);
  fs.appendFile(`server.log`, log, (error) => {
    console.log(error);
  });
  next();

});

// app.use((request, response, next) => {
//
//   response.render(`maintenance.hbs`)
//
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper(`getCurrentYear`, () => {
  return new Date().getFullYear();
});

hbs.registerHelper(`screamIt`, (text) => {
  return text.toUpperCase();
})

app.get(`/`, (request, response) => {

  //response.send(`<h1>Hello World!</h1>`);

  // response.send({
  //   title: `Hello World!`,
  //   message: `Finally got it`
  // })

  response.render(`home.hbs`, {
    pageTitle: `Welcome`,
    description: `Hello World!`
  });

});

app.get(`/about`, (request, response) => {

  //response.send(`<h1>Hello World!</h1>`);
  response.render(`about.hbs`, {
    pageTitle: `About page`
  });

});

app.get(`/projects`, (request, response) => {

  response.render(`projects.hbs`, {
    pageTitle: "Projects page"
  })

});

app.get(`/error`, (request, response) => {

  response.send({
    errorMessage: `Error fetching nothing`
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});