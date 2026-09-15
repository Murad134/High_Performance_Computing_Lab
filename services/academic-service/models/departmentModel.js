const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

const collectionName = "departments";

async function createDepartment(data) {
    const collection = getCollection(collectionName);

    const department = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
    };

    const result = await collection.insertOne(department);
    return result;
}

async function getAllDepartments() {
    const collection = getCollection(collectionName);
    return await collection.find().sort({ created_at: -1 }).toArray();
}

async function getDepartmentById(id) {
    const collection = getCollection(collectionName);
    return await collection.findOne({ _id: new ObjectId(id) });
}

async function updateDepartment(id, data) {
    const collection = getCollection(collectionName);

    const { _id, ...restData } = data; // ✅ remove immutable field

    const updatedData = {
        $set: {
            ...restData,
            updated_at: new Date(),
        },
    };

    return await collection.updateOne(
        { _id: new ObjectId(id) },
        updatedData
    );
}

async function deleteDepartment(id) {
    const collection = getCollection(collectionName);
    return await collection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};