import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Company Management API",
            version: "1.0.0",
            description: "API para sistema de creacion de admins y empresas profesionales con reportes automaticos de excel.",
            contact:{
                name: "Pablo Villela",
                email: "pvillela-2021656@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3008/interferManager/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/companies/companies.routes.js",
        "./src/admins/admins.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }
