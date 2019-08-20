function boardgameController(Boardgame) {
  function post(req, res) {    
    if(req.body._id) delete req.body._id // deciding your own id is not allowed
    const boardgame = new Boardgame(req.body)
		if (!req.body.title || !req.body.author || !req.body.genre) {
			res.status(400)
			return res.send('Title, author, price and stock details (quantity) is required')
    }
    
		boardgame.save(boardgame)
		res.status(201)
    return res.json(boardgame)
	}
	function get(req, res) {
		const query = {}
		if (req.query.genre) {
			query.genre = req.query.genre
		}
		if (req.query.title) {
			query.title = req.query.title
		}
		if (req.query.author) {
			query.author = req.query.author
		}
		Boardgame.find(query, (err, boardgames) => {
			if(err) return res.send(err)
			const returnBoardgames = boardgames.map((boardgame) => {
				const newBoardgame = boardgame.toJSON()
				newBoardgame.links = {}
				newBoardgame.links.self = `http://${req.headers.host}/api/boardgames/${boardgame._id}`
				return newBoardgame
			})
			return res.json(returnBoardgames)
		})
	}
	function getById(req, res) {
    const returnBoardgame = req.boardgame.toJSON() 
    const title = req.boardgame.title.split(' ').join('%20')
    const author = req.boardgame.author.split(' ').join('%20')
    const genre = req.boardgame.genre.split(' ').join('%20')
		returnBoardgame.links = {}
		returnBoardgame.links.FilterByTitle = `http://${req.headers.host}/api/boardgames/?title=${title}`
		returnBoardgame.links.FilterByAuthor = `http://${req.headers.host}/api/boardgames/?author=${author}`
		returnBoardgame.links.FilterByGenre = `http://${req.headers.host}/api/boardgames/?genre=${genre}`
		res.json(returnBoardgame)
	}
	function put(req, res) {
		const { boardgame } = req
		boardgame.title = req.body.title
		boardgame.author = req.body.author
		boardgame.genre = req.body.genre
		boardgame.description = req.body.description
		boardgame.productDetails.weight = req.body.productDetails.weight
		boardgame.productDetails.dimensions = req.body.productDetails.dimensions
		boardgame.productDetails.ageRestriction = req.body.productDetails.ageRestriction
		boardgame.productDetails.maxPlayers = req.body.productDetails.maxPlayers
		boardgame.productDetails.minPlayers = req.body.productDetails.minPlayers
		boardgame.stockDetails.quantity = req.body.stockDetails.quantity
		req.boardgame.save((err) => {
			if (err) return res.send(err)
			return res.json(boardgame)
		})
	}
	function patch(req, res) {
		const { boardgame } = req
		Object.entries(req.body).forEach((item) => {
			const key = item[0]
			const value = item[1]
			boardgame[key] = value
		})
		req.boardgame.save((err) => {
			if (err) return res.send(err)
			return res.json(boardgame)
		})
	}
	function remove(req, res) {
		req.boardgame.remove((err) => {
			if (err) return res.send(err)
			return res.sendStatus(204)
		})
	}

	return { post, get, getById, put, patch, remove }
}

module.exports = boardgameController