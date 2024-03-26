const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("Viewing one stock: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNotNull(res.body.stockData.price);
        assert.isNotNull(res.body.stockData.likes);
        done();
      });
  })

  test("Viewing one stock and like it: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: 'true' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNotNull(res.body.stockData.price);
        assert.isNotNull(res.body.stockData.likes);
        done();
      });
  })

  test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: 'true' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNotNull(res.body.stockData.price);
        assert.isNotNull(res.body.stockData.likes);
        done();
      });
  })

  test("Viewing two stocks: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'MSFT'] })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.equal(res.body.stockData[0].stock, 'GOOG');
        assert.equal(res.body.stockData[1].stock, 'MSFT');
        assert.isNotNull(res.body.stockData[0].price);
        assert.isNotNull(res.body.stockData[1].price);
        assert.isNotNull(res.body.stockData[0].rel_likes);
        assert.isNotNull(res.body.stockData[1].rel_likes);
        done();
      });
  })

  test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function(done) {
    chai
      .request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'MSFT'], like: 'true' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.equal(res.body.stockData[0].stock, 'GOOG');
        assert.equal(res.body.stockData[1].stock, 'MSFT');
        assert.isNotNull(res.body.stockData[0].price);
        assert.isNotNull(res.body.stockData[1].price);
        assert.isNotNull(res.body.stockData[0].rel_likes);
        assert.isNotNull(res.body.stockData[1].rel_likes);
        done();
      });
  })
  
});
