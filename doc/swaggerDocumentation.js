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


        }
    },
}
export default swaggerDocumentation