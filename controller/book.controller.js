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
        if (!req.files || !req.files.book || !req.files.image) {
            return res.status(400).json({ message: 'No file uploaded' });
          }
      
          // Extract other fields and the uploaded files
          const { title, author, description, price, category } = req.body;
          const bookFile = req.files.book;  // The book file
          const imageFile = req.files.image;  // The image file
      
          const allowedBookTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // Word Document (docx)
          ];
          // Allowed MIME types for image files
          const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      
          // Validate the MIME type of the book file
          if (!allowedBookTypes.includes(bookFile.mimetype)) {
            return res.status(400).json({ message: 'Invalid book file type. Only PDF and Word files are allowed.' });
          }
      
          // Validate the MIME type of the image file
          if (!allowedImageTypes.includes(imageFile.mimetype)) {
            return res.status(400).json({ message: 'Invalid image file type. Only JPEG, PNG, and JPG files are allowed.' });
          }
      
          try {
            // Upload the book file to Firebase Storage
            const bookStorageRef = ref(storage, 'uploads/books/' + bookFile.name);
            const bookMetadata = {
              contentType: bookFile.mimetype,  // Ensure the content type is set for the book file
            };
            const bookSnapshot = await uploadBytes(bookStorageRef, bookFile, bookMetadata);
            const bookDownloadUrl = await getDownloadURL(bookSnapshot.ref);
      
            // Upload the image file to Firebase Storage
            const imageStorageRef = ref(storage, 'uploads/images/' + imageFile.name);
            const imageMetadata = {
              contentType: imageFile.mimetype,  // Ensure the content type is set for the image file
            };
            const imageSnapshot = await uploadBytes(imageStorageRef, imageFile, imageMetadata);
            const imageDownloadUrl = await getDownloadURL(imageSnapshot.ref);
      
            // Create a new book document with the download URLs
            const newBook = new bookModel({
              title,
              author,
              description,
              price,
              category,
              bookImage: imageDownloadUrl,
              book: bookDownloadUrl,
            });
      
            // Save the new book document to the database
            await newBook.save();
      
            // Send the new book as a response
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
                book.bookImage = downloadUrl;  
                book.book = downloadUrl; 
            }

            await book.save();

            res.status(200).json(book);
        } catch (error) {
            console.log("Error updating book:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteBook: async (req, res) => {
        try{
        const { id } = req.params;
        const deleteBook= await bookModel.findByIdAndDelete(id);
        if(!deleteBook){
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
        
    }
        catch(error) {
            console.log("Error deleting book:", error.message);
            res.status(500).json({ message: "Internal server error" });
        
    }
}

};

export default bookController;
