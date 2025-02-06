import contactModel from "../model/contact.model.js";

const contactController = {
    addContact: async (req, res) => {
        const newContact = new contactModel(req.body);
        try {
            const result = await newContact.save();
            res.status(201).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    getAllContacts: async (req, res) => {
        try {
            const contacts = await contactModel.find({});
            res.send(contacts);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getContactById: async (req, res) => {
        try {
            const contact = await contactModel.findById(req.params.id);
            if (!contact) {
                return res.status(404).send("Contact not found");
            }
            res.send(contact);
        }
         catch (error) {
            res.status(500).send(error.message);
         }
    },
    deleteContact: async(req, res)=>{
        try{
            const contact = await contactModel.findByIdAndDelete(req.params.id);
            if (!contact) {
                return res.status(404).send("Contact not found");
            }
            res.send(contact);
        }
    
    catch (error) {
      
        res.status(500).send(error.message);
    }
}
}

    export default contactController;