import request from 'supertest'

import { app } from '../app'

import createConnection from '../database'

describe("Survey", async () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Example test",
            description: "Example descriptions"
        });

        expect(response.status).toBe(201)
    })





})