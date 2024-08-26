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
    }
};

export default bookController;
