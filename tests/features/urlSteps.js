import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';
import { createShortUrl, redirectUrl, getStats } from '../../controllers/urlController.js';

let response;
let shortUrl;

// Step 1: Shorten a new URL
Given('I have a valid URL {string}', function (originalUrl) {
    this.originalUrl = originalUrl;
});

When('I send a request to shorten the URL', async function () {
    response = await request(app)
        .post('/api/url/shorten')
        .send({ url: this.originalUrl });
    
    shortUrl = response.body.shortUrl;
});

Then('I should receive a short URL in response', function () {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('shortUrl');
});

// Step 2: Redirect to the original URL
Given('I have a short URL', function () {
    expect(shortUrl).to.exist;
});

When('I access the short URL', async function () {
    response = await request(app).get(`/api/url/${shortUrl.split('/').pop()}`);
});

Then('I should be redirected to the original URL', function () {
    expect(response.status).to.equal(302);
});

// Step 3: Get URL statistics
When('I request statistics for the short URL', async function () {
    response = await request(app).get(`/api/url/stats/${shortUrl.split('/').pop()}`);
});

Then('I should receive the stats with click count', function () {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('clicks');
});

describe('URL Controller', () => {
    it('should create a short URL', async () => {
      const req = { body: { url: 'https://example.com' } };
      const res = {
        status: function(code) { this.statusCode = code; return this; },
        json: function(data) { this.body = data; return this; }
      };
      
      await createShortUrl(req, res);
      
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('shortUrl');
    });

});
