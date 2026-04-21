import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TaskForge API",
            version: "1.0.0",
            description: "Authentication + RBAC + Tasks API",
        },
        servers: [
            {
                url: "http://localhost:5000",
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
            schemas: {
                RegisterInput: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 6 },
                        role: { type: "string", enum: ["user", "admin"] },
                    },
                },
                LoginInput: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string" },
                    },
                },
                TaskInput: {
                    type: "object",
                    required: ["title"],
                    properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        status: {
                            type: "string",
                            enum: ["pending", "completed"],
                        },
                    },
                },
            },
        },
        paths: {
            "/api/v1/auth/register": {
                post: {
                    summary: "Register user",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/RegisterInput",
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: "User created" },
                    },
                },
            },
            "/api/v1/auth/login": {
                post: {
                    summary: "Login user",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/LoginInput",
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: "Login success" },
                    },
                },
            },
            "/api/v1/tasks": {
                get: {
                    summary: "Get tasks",
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: "Task list" } },
                },
                post: {
                    summary: "Create task",
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/TaskInput",
                                },
                            },
                        },
                    },
                    responses: { 201: { description: "Task created" } },
                },
            },
            "/api/v1/tasks/{id}": {
                patch: {
                    summary: "Update task",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: { 200: { description: "Task updated" } },
                },
                delete: {
                    summary: "Delete task",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: { 200: { description: "Task deleted" } },
                },
            },
            "/api/v1/admin/users": {
                get: {
                    summary: "Get all users (admin)",
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: "User list" } },
                },
            },
            "/api/v1/admin/tasks": {
                get: {
                    summary: "Get all tasks (admin)",
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: "Task list" } },
                },
            },
            "/api/v1/admin/tasks/{id}": {
                delete: {
                    summary: "Delete any task (admin)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: { type: "string" },
                        },
                    ],
                    responses: { 200: { description: "Task deleted" } },
                },
            },
        },
    },
    apis: [],
};

export default swaggerJsdoc(options);
