const { getBookCollection } = require('../models/bookModel');
const { ObjectId } = require('mongodb');

// ── GET all books ──
const getAllBooks = async (req, res) => {
    try {
        const collection = getBookCollection();
        const books = await collection.find({}).sort({ year: -1 }).toArray();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
};

// ── GET single book ──
const getBookById = async (req, res) => {
    try {
        const collection = getBookCollection();
        const book = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch book', error: error.message });
    }
};

// ── POST add book ──
const addBook = async (req, res) => {
    try {
        const collection = getBookCollection();
        const { title, year, publicationType, publisher, conference, location, link, authors } = req.body;

        if (!title || !year) {
            return res.status(400).json({ message: 'Title and year are required' });
        }

        const newBook = {
            title,
            year: Number(year),
            publicationType: publicationType || 'Book Chapter',
            publisher: publisher || '',
            conference: conference || '',
            location: location || '',
            link: link || '',
            authors: Array.isArray(authors) ? authors : [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newBook);
        res.status(201).json({ message: 'Book added successfully', insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book', error: error.message });
    }
};

// ── PUT update book ──
const updateBook = async (req, res) => {
    try {
        const collection = getBookCollection();
        const { title, year, publicationType, publisher, conference, location, link, authors } = req.body;

        const updatedBook = {
            ...(title && { title }),
            ...(year && { year: Number(year) }),
            ...(publicationType && { publicationType }),
            ...(publisher !== undefined && { publisher }),
            ...(conference !== undefined && { conference }),
            ...(location !== undefined && { location }),
            ...(link !== undefined && { link }),
            ...(authors && { authors }),
            updatedAt: new Date(),
        };

        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedBook }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update book', error: error.message });
    }
};

// ── DELETE book ──
const deleteBook = async (req, res) => {
    try {
        const collection = getBookCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };