const express = require('express')
const boardgameController = require('../controllers/boardgameController')

function routes(Boardgame) {
	const boardgameRouter = express.Router()
  const controller = boardgameController(Boardgame)
  
  boardgameRouter.route('/boardgames')
		.get(controller.get)
		.post(controller.post)
	
	//middleware function
	boardgameRouter.use('/boardgames/:Id', (req, res, next) => {
		if(req.body._id) delete req.body._id // in case an id is sent with the request
		Boardgame.findById(req.params.Id, (err, boardgame) => {
			if(err) return res.send(err)
			if (boardgame) {
				req.boardgame = boardgame
				return next()
			}
			return res.sendStatus(404)
		})
	})

	boardgameRouter.route('/boardgames/:Id')
		.get(controller.getById)
		.put(controller.put)
		.patch(controller.patch)
		.delete(controller.remove)	

	return boardgameRouter
}

module.exports = routes