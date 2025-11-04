import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API Documentation",
      version: "1.0.0",
      description: "A simple notes application API with authentication",
      contact: {
        name: "API Support",
        email: "support@notesapp.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://api.notesapp.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            name: {
              type: "string",
              description: "User name",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Note: {
          type: "object",
          required: ["title", "content"],
          properties: {
            _id: {
              type: "string",
              description: "Note ID",
            },
            title: {
              type: "string",
              description: "Note title",
            },
            content: {
              type: "string",
              description: "Note content",
            },
            userId: {
              type: "string",
              description: "ID of user who created the note",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            error: {
              type: "string",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controller/*.ts"], // Path to API routes
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Notes API Documentation",
    })
  );

  // JSON format documentation
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    "📚 Swagger documentation available at http://localhost:5000/api-docs"
  );
};
