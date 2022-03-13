const request = require("supertest");
const app = require("./app");

describe("GET /",()=>{
    it("responds with Hello unigether",(done)=>{
        request(app).get("/").expect("Hello unigether",done);
    })
})