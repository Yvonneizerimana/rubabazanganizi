import {body} from 'express-validator'

export const userValidations=[
    body('names','name is required').not().isEmpty(),
    body('email','email is required').not().isEmpty().isEmail()
    
]
