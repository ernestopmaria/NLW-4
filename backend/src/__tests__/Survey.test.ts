import request from 'supertest'

import { app } from '../app'

import createConnection from '../database'



describe("Survey", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Example",
            description: "Example descriptions"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id")
    })

    it("Should be able to get all survey", async () => {
        await request(app).post("/surveys").send({
            title: "Example",
            description: "Example descriptions"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2)


    });


})