export const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "HelloWorld API",
            description: "Hello World Class",
            contact: {
                name: "cmduquer"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ["index.js"]
};