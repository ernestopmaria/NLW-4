import express from 'express';

const app = express();

app.get("/", (request, response) => {
    return response.json({ message: "hellow wold" })

})

app.post("/", (request, response) => {


    return response.json({ message: "sucesso" })

})

app.listen(3333, () => console.log("servidor is running now!"))
