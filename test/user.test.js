const request=require('supertest')
const app=require('../index.js')
const {expect}=require('@jest/grobals')

describe('user routes',()=>{
    it('should create a new user',async()=>{
const response=await request(app)
.post("/create")
.send({names:"shami gaella", phone:"0786543234", email:"testuser@gmail.com",password:"Password@123", confirmPassword:"Password@123"})

expect (response.status).toBe(201)
expect (response.body).toHaveProperty(names,phone,email)
    })
})
