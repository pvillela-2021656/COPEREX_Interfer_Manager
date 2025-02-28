import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { adminDefault } from "./src/admins/admins.default.js"

config()
initServer()
adminDefault()