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
            {name:"users", description:"users API"}
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
        }
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
        }
        }
    },
}
export default swaggerDocumentation