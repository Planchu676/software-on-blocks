app = require('./index').app

const PORT = process.env.PORT || 8085
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});   