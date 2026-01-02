import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hatchery Management API",
      version: "1.0.0",
      description: "API documentation for NHIA Hatchery Management System",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // ⚠️ THIS IS THE MOST IMPORTANT LINE
  apis: ["./src/docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
