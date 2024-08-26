import bookModel from '../model/book.model.js';
import configurations from '../configs/index.js';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; 


// Firebase configuration
const firebaseConfig = {
    apiKey: configurations.apiKey,
    authDomain: configurations.authDomain,
    projectId: configurations.projectId,
    storageBucket:configurations.storageBucket,
    messagingSenderId: configurations.messagingSenderId,
    appId: configurations.appId,
    measurementId: configurations.measurementId, 
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const firestore = getFirestore(app);

const bookController = {
  
    uploadAndAddBook: async (req, res) => {
        
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, author, description, price, category } = req.body;
        const file = req.files.file;

        try {
            
            const storageRef = ref(storage, 'uploads/' + file.name);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(snapshot.ref);

            
            const newBook = new bookModel({
                title,
                author,
                description,
                price,
                category,
                book: downloadUrl
            });

            await newBook.save();

            res.status(201).json(newBook);
        } catch (error) {
            console.log("Error uploading book:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAllBooks:async(req, res,next) => {
        try {
            const books = await bookModel.find({});
            res.status(200).json(books);
        } catch (error) {
            console.log("Error fetching books:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getBookById: async (req, res,next) => {
        try{
    
        const getBook=await bookModel.findById({_id:req.params.id})
        if(!getBook){
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            Message: "book retrieved successfully",
            Book:getBook
        });
    }
    catch(err){
        console.log("Error fetching book:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
    },

    updateBook: async (req, res) => {
        const { id } = req.params; 
        const { title, author, description, price, category } = req.body;
        const file = req.files ? req.files.file : null;

        try {
            
            const book = await bookModel.findById(id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            if (title) book.title = title;
            if (author) book.author = author;
            if (description) book.description = description;
            if (price) book.price = price;
            if (category) book.category = category;

          
            if (file) {
                const storageRef = ref(storage, 'uploads/' + file.name);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadUrl = await getDownloadURL(snapshot.ref);
                book.book = downloadUrl; 
            }

            await book.save();

            res.status(200).json(book);
        } catch (error) {
            console.log("Error updating book:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }

};

export default bookController;
