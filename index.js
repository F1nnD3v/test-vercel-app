const express = require("express");
const app = express();
const port = 3000;

const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

app.get("/", async (req, res) => {

    let usersCount = await prismaClient.user.count();
    res.send(`Hello World! ${usersCount} users in the database.`)
});

app.post("/", async (req, res) => {

    await prismaClient.user.create({
        data: {
            name: "Alice",
            email: "alice@email.com",
            posts: {
                create: { title: "Hello World" },
            },
        },
    });

    res.send("User created");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
