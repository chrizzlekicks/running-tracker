const notFound = (req, res) => {
  res.status(404).send('The route you are trying to access does not exit')
}

module.exports = notFound
