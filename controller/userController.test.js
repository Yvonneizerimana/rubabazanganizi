// userController.test.js

const userController = require('./user.controller'); // Adjust the import if necessary

describe('userController - createUser', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'john@example.com',
                // Add other fields as necessary
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return an error if the user exists', async () => {
        // Mock user existence and handle your logic
        await userController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('should create new user and send email', async () => {
        // Implement your test logic here
        await userController.createUser(req, res);
        expect(sgMail.send).toHaveBeenCalledWith(expect.objectContaining({
            to: 'john@example.com',
            subject: 'Account created !! ',
        }));
    });
});
