const should = require('should')
const sinon = require('sinon')
const boardgameController = require('../controllers/boardgameController')

describe('Boardgame Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      const Boardgame = function(boardgame) {this.save = () =>{}}

      const req = {
        body: {
          author: 'Great guy',
          genre: 'Comedy'
        }
      }

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      }

      const controller = boardgameController(Boardgame)
      controller.post(req, res)

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`)
      res.send.calledWith('Title is required').should.equal(false)
    })
    it('should not allow an empty author on post', () => {
      const Boardgame = function(boardgame) {this.save = () =>{}}

      const req = {
        body: {
          title: "Test",
          genre: 'Comedy'
        }
      }

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      }

      const controller = boardgameController(Boardgame)
      controller.post(req, res)

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`)
      res.send.calledWith('Author is required').should.equal(false)
    })
    it('should not allow an empty genre on post', () => {
      const Boardgame = function(boardgame) {this.save = () =>{}}

      const req = {
        body: {
          title: "Test",
          author: 'Great guy'
        }
      }

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      }

      const controller = boardgameController(Boardgame)
      controller.post(req, res)

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`)
      res.send.calledWith('Genre is required').should.equal(false)
    })
  })
})