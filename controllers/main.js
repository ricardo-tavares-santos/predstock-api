const getCompanyData = (req, res, db) => {
  db.select('*').from('Company')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postCompanyData = (req, res, db) => {
  const { symbol, name, exchange } = req.body
  const added = new Date()
  db('Company').insert({symbol, name, exchange})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putCompanyData = (req, res, db) => {
  const { id, symbol, name, exchange } = req.body
  db('Company').where({id}).update({symbol, name, exchange})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteCompanyData = (req, res, db) => {
  const { id } = req.body
  db('Company').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getCompanyData,
  postCompanyData,
  putCompanyData,
  deleteCompanyData
}