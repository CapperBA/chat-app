const should = require('should')
const request = require('supertest')
const mongoose = require('mongoose')

process.env.ENV = 'Test'
process.env.PORT = 5000

const app = require('../app.js')
const Boardgame = mongoose.model('Boardgame')
const agent = request.agent(app)

describe('Boardgame CRUD Test', () => {
    it('should allow a boardgame to be posted and return the object', (done) =>{
        const boardgamePost = new Boardgame({title: 'Setlers', author: 'Hasbro', genre: 'Strategy'})
        agent.post('/api/boardgames')
        .send(boardgamePost)
        .expect(200)
        .end((err, result) =>{
            result.body.should.have.property('_id')
            result.body.title.should.equal('Setlers')
            result.body.author.should.equal('Hasbro')
            result.body.genre.should.equal('Strategy')
            done()
        })
    })

    // deletes the newly created object in the database from the post request
    afterEach((done) => {
        Boardgame.deleteMany({}).exec()
        done()
    })

    // closes app and connection to database
    after((done) => {
        mongoose.connection.close()
        app.server.close(done())
    })
})