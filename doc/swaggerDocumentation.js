const swaggerDocumentation={
    swagger:"2.0",
    info:{
        version:"2.0.0",
        title:"rubabazanganizi API",
        description:"rubabazanganizi API is an API that hold different Kinyarwanda stories and proverbs",
        lisence:{
            name:"MIT",
            url:"https://opensource.org/licenses/mit"
        }
    },
    basePath:"/api/v1",
    tags:{
        name:[
            {name:"users", description:"users API"},
            {name:"books", description:"books API"},
            {name:"contacts", description:"contacts API"}
        ]
    },
    paths:{
        "/user/create":{
            post:{
                summary:"create a new user",
                tags:["users"],
                consumes:["application/json"],
                parameters:[
                    {
                        in:"body",
                        name:"body",
                        description:"enter a data of user to create a user",
                        required:true,
                        schema:{
                            $ref:"#/database/User/createUser"
                        } 
                    }
                ],
                responses:{
                    200:{
                        description:"User created successfuly"
                    },
                }

            }
        },
        "/user/login":{
            post:{
                summary:"enter email and password of the user for login",
                tags:["users"],
                consumes:"application/json",
                parameters:[
                    {
                    in:"body",
                    name:"body",
                    description:"user credentials for login",
                    required:true,
                    schema:{
                        $ref:"#/database/User/loginUser"
                    }
                }
                ],
             responses:{
                200:{
                    description:"you have successfuly logged in"
                },
                400:{
                    description:"user not found"
                },
             }
            }
        },

        "/user/otp":{
            post:{
                summary:"enter 6 digits you received via email for verfication",
                tags:["users"],
                consumes:"application/json",
                parameters:[
                    {
                    in:"body",
                    name:"body",
                    description:"OTP digits",
                    required:true,
                    schema:{
                        $ref:"#/database/User/verifyOtp"
                    }
                }
                ],
             responses:{
                200:{
                    description:"your OTP verfied and you have successfuly login"
                },
                400:{
                    description:"Invalid otp"
                },
             }
            }
        },

        "/user/newOtp":{
            post:{
                summary:"enter your email to generate new OTP",
                tags:["users"],
                consumes:"application/json",
                parameters:[
                    {
                    in:"body",
                    name:"body",
                    description:"OTP digits",
                    required:true,
                    schema:{
                        $ref:"#/database/User/newOtp"
                    }
                }
                ],
             responses:{
                200:{
                    description:"your new OTP generated successfuly and now you can verify it for logging to the system"
                },
                400:{
                    description:"Invalid otp"
                },
             }
            }
        },

        "/user/forgotPassword":{
            post:{
                summary:"enter your email to reset your password",
                tags:["users"],
                consumes:"application/json",
                parameters:[
                    {
                    in:"body",
                    name:"body",
                    description:"your email here to get reset password link",
                    required:true,
                    schema:{
                        $ref:"#/database/User/forgotPassword"
                    }
                }
                ],
             responses:{
                200:{
                    description:"password reset link has been successfuly sent to your email provided"
                },
                400:{
                    description:"user not found"
                },
             }
            }
        },

        "/user/changePassword/{resetToken}":{
            post:{
                summary:"enter your reset password link you received via email for changing password",
                tags:["users"],
                consumes:"application/json",
                parameters:[
                    {
                        in: "path",
                        name: "resetToken",
                        description: "Reset token received via email",
                        required: true,
                        type: "string",
                      },
                    {
                    in:"body",
                    name:"body",
                    description:"change your password",
                    required:true,
                    schema:{
                        $ref:"#/database/User/changePassword"
                    }
                }
                ],
             responses:{
                200:{
                    description:"your password has been changed successfully"
                },
                400:{
                    description:"password doesn't match"
                },
             }
            }
        },

        "/book/addBook": {
            post: {
              summary: "add a new book",
              tags: ["books"],
              consumes: ["multipart/form-data"],
              parameters: [
                {
                  in: "formData",
                  name: "title",
                  type: "string",
                  description: "book title",
                  required: true,
                },
                {
                  in: "formData",
                  name: "author",
                  type: "string",
                  description: "book author",
                  required: true,
                },
                {
                  in: "formData",
                  name: "description",
                  type: "string",
                  description: "book description",
                  required: true,
                },
                {
                  in: "formData",
                  name: "price",
                  type: "number",
                  description: "book price",
                  required: true,
                },
                {
                  in: "formData",
                  name: "category",
                  type: "string",
                  description: "book category",
                  required: true,
                },
                
                {
                  in: "formData",
                  name: "file",
                  type: "file",
                  description: "upload book image ",
                  
                },
                {
                  in: "formData",
                  name: "bookFile",
                  type: "file",
                  description: "upload book",
                  
                },
                {
                  in: "formData",
                  name: "imageFile",
                  type: "file",
                  description: "upload book image",
                  
                },
              ],
              responses: {
                200: {
                  description: "book added successfully",
                },
              },
            }},
          "/book/deleteBook/{id}": {
            delete: {
              summary: "Delete a book",
              tags: ["books"],
              security: [{ BearerAuth: [] }],
              parameters: [
                {
                  in: "path",
                  name: "id",
                  type: "string",
                  required: true,
                  description: "ID of book to delete",
                },
              ],
              responses: {
                200: {
                  description: "book deleted successfully",
                },
              },
            },
          },


    "/book/updateBook/{id}": {
            put: {
              summary: "update a book",
              tags: ["books"],
              consumes: ["multipart/form-data"],
              parameters: [
                {
                    in: "path",
                    name: "id",
                    type: "string",
                    required: true,
                    description: "ID of the book to update",
                  },
                {
                  in: "formData",
                  name: "title",
                  type: "string",
                  description: "book title",
                 
                },
                {
                  in: "formData",
                  name: "author",
                  type: "string",
                  description: "book author",
                
                },
                {
                  in: "formData",
                  name: "description",
                  type: "string",
                  description: "book description",
                 
                },
                {
                  in: "formData",
                  name: "price",
                  type: "number",
                  description: "book price",
                  
                },
                {
                  in: "formData",
                  name: "category",
                  type: "string",
                  description: "book category",
                 
                },
                
                {
                  in: "formData",
                  name: "file",
                  type: "file",
                  description: "upload book image",
                 
                },
                {
                  in: "formData",
                  name: "file",
                  type: "file",
                  description: "upload book",
                 
                },
              ],
              responses: {
                200: {
                  description: "Book updated successfully",
                },
              },
            },
          },
          "/book/getOneBook/{id}": {
            get: {
              summary: "get one book",
              tags: ["books"],
              security: [{ BearerAuth: [] }],
              parameters: [
                {
                  in: "path",
                  name: "id",
                  type: "string",
                  required: true,
                  description: "ID of the book to get one book",
                },
              ],
              responses: {
                200: {
                  description: "book retrieved successfully",
                },
              },
            },
          },


          "/book/getAllBooks": {
            get: {
              summary: "get all books",
              tags: ["books"],
              security: [{ BearerAuth: [] }],
              responses: {
                200: {
                  description: "here is the list of all books",
                },
              },
            },
          },
       
    "/contacts/create":{
            post:{
                summary:"create a new contact",
                tags:["contacts"],
                consumes:["application/json"],
                parameters:[
                    {
                        in:"body",
                        name:"body",
                        description:"enter contact data",
                        required:true,
                        schema:{
                            $ref:"#/database/User/Contact"
                        } 
                    }
                ],
                responses:{
                    200:{
                        description:"User created successfuly"
                    },
                }

            }
        },
    },

    database:{
        User:{
            createUser:{
                type:"object",
                required:["names","phone","email","password","confirmPassword"],
                properties:{
                    names:{type:"string"},
                    phone:{type:"string"},
                    email:{type:"string"},
                    role:{type:"string",enum:["admin","user"]},
                    password:{type:"string"},
                    confirmPassword:{type:"string"}

                }
            },

        loginUser:{
            type:"object",
            required:["email","password"],
            properties:{
                email:{type:"string"},
                password:{type:"string"}
            }
        },

        verifyOtp:{
            type:"object",
            required:true,
            properties:{
                otp:{type:"string"}
            }
        },

        newOtp:{
            type:"object",
            required:true,
            properties:{
                email:{type:"string"}
            }
        },

        forgotPassword:{
            type:"object",
            required:true,
            properties:{
                email:{type:"string"}
            }
        },

        changePassword:{
            type:"object",
            required:true,
            properties:{
                newPassword:{type:"string"},
                confirmPassword:{type:"string"}
            }
        }


        },

        Book:{
            addBook:{
                type:"object",
                required:["title","author","description","price","category"],
                properties:{
                    file:{type:"string",format:"binary"},
                    file:{type:"string",format:"binary"},
                    title:{type:"string"},
                    author:{type:"string"},
                    description:{type:"string"},
                    price:{type:"number",format:"float"},
                    category:{type:"string"}
                }
            }
        },
        Contact: {
          type: "object",
          required: ["name", "email", "message"],
          properties: {
            name: {
              type: "string",
              description: "Name of the contact person",
            },
            email: {
              type: "string",
              description: "Contact email address",
            },
            message: {
              type: "string",
              description: "Message from the contact",
            },
          },
        },
      
    },
}
export default swaggerDocumentation