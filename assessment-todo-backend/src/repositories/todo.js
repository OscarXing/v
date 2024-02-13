export default (db) => {
    const { TODO_COLLECTION } = process.env;
    const collection = db.collection(TODO_COLLECTION);

    async function insertOne(todo) {
        return await collection.insertOne(todo);
    }

    // New function for getting singular toDo
    async function getToDoByUser(userID) {
        return await collection.find({
            userID
        }).toArray();
    }

    // New function for getting unique toDo by id
    async function getToDoByID(todoID) {
        return await collection.updateOne(
            {todoID: todoID},
            // Toggle status
            [{ $set: {status: {$switch: {
                branches: [
                    {case: { $eq: [ "$status", "Complete"]}, then: "In Progress"},
                    {case: { $eq: [ "$status", "In Progress"]}, then: "Complete"}
                ],
                default: ""
            }}}}]
        );
    }
    return {
        insertOne,
        getToDoByUser,
        getToDoByID
    };
};