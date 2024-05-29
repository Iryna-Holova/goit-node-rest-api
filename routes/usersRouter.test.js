import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import usersServices from "../services/usersServices.js";
import constants from "../constants.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/users/login", () => {
  let server = null;

  const userData = {
    email: "test@test.com",
    password: "123456",
  };

  beforeAll(async () => {
    try {
      await mongoose.connect(DB_TEST_HOST);
      server = app.listen(PORT);
      await request(app).post("/api/users/register").send(userData);
    } catch (error) {
      console.error(
        "Failed to connect to the database or start the server",
        error
      );
    }
  });

  afterAll(async () => {
    try {
      await usersServices.deleteAllUsers();
      await mongoose.connection.close();
      if (server) {
        await new Promise((resolve) => server.close(resolve));
      }
    } catch (error) {
      console.error("Failed to close the database connection or server", error);
    }
  });

  test("test login with correct data", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(userData);

    expect(statusCode).toBe(200);
    expect(body.token).toEqual(expect.any(String));
    expect(body.user.email).toBe(userData.email);
    expect(body.user.subscription).toBe(constants.SUBSCRIPTIONS[0]);
    expect(body.user.avatarURL).toEqual(expect.any(String));
  });

  test("test login with empty body", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe("Body must have at least one field");
  });

  test("test login without email", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send({ password: userData.password });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"email" is required');
  });

  test("test login without password", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send({ email: userData.email });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"password" is required');
  });

  test("test login with invalid email", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send({ email: "testtest.com", password: userData.password });

    expect(statusCode).toBe(400);
    expect(body.message).toBe("Invalid email");
  });

  test("test login with invalid password", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send({ email: userData.email, password: "12345" });

    expect(statusCode).toBe(400);
    expect(body.message).toBe(
      '"password" length must be at least 6 characters long'
    );
  });

  test("test login with wrong email", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send({ email: "testt@test.com", password: userData.password });

    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });

  test("test login with wrong password", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send({ email: userData.email, password: "123457" });

    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });
});
