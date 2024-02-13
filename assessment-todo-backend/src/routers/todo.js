import express from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { v4 as uuidv4 } from 'uuid';
import { validateTodo, validateUser } from '../schemas/validators.js';
import auth from '../middleware/auth.js';
import { verifyToken } from '../functions/cookies.js';


dayjs.extend(utc);
const router = express.Router();

export default ({todoRepository}) => {
    // Create new todo
    router.post('/', auth, async (req, res) => {
        try {
            let session = verifyToken(req.cookies['todox-session']);

            const todoID = uuidv4();
            const created = dayjs().utc().toISOString();

            let newTodo = {
                ...req.body,
                todoID,
                userID: session.userID,
                status: "In Progress", // Added status parameter.
                created
            };

            if (validateTodo(newTodo)) {
                let resultTodo = await todoRepository.insertOne(newTodo);
                return res.status(201).send(resultTodo);
            }
            console.error(validateTodo.errors);
            return res.status(400).send({error: "Invalid field used."});
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({error: "Todo creation failed."});
        }
    });
    
    // Get a users todos
    router.get('/all', auth, async (req, res) => {
        try {
            let session = verifyToken(req.cookies['todox-session']);
            const todos = await todoRepository.getToDoByUser(session.userID);
            // Sends back all the posts
            if (todos) {
                return res.status(200).send(todos);
            }
            else {
                return res.status(400).send({});
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send({error: "Failed to fetch user."});
        }
    });

    // Update status
    router.get('/id', auth, async (req, res) => {
        try {
            let session = verifyToken(req.cookies['todox-session']);
            console.log("Verified User");

            let testVar = {
                ...req
            };

            console.log(testVar);
        }
        catch (err) {
            console.error(err);
            res.status(500).send({error: "Failed to fetch user."});
        }
    });

    // Update status of todo related to uniqueID
    router.patch('/id', auth, async (req, res) => {
        try {
            let session = verifyToken(req.cookies['todox-session']);
            console.log("Verified User");
            
            let testVar = {
                ...req.body
            }

            console.log(testVar.userID);
            
            const todos = await todoRepository.getToDoByID(testVar.userID);
            console.log(todos);
            
        }
        catch (err) {
            console.error(err);
            res.status(500).send({error: "Failed to fetch user."});
        }
    });

    return router;
}
