exports.UserRegistration = {
    firstName:{
        type: 'text',
        required: true,
        min: 3,
        max: 15,
    },
    lastName:{
        type: 'text',
        required: true,
        min: 3,
        max: 15,
    },
 email:{
     type: 'email',
     required: true,
     unique: true,
     min: 6,
     max: 30,
 },
 phoneNumber:{
    type: 'number',
    required: true,
    min: 10,
    max: 10,
},
userName:{
    type: 'text',
    required: true,
    min: 3,
    max: 10,
},
token:{
    type: 'text',
    required: true,
    min: 10,
    max: 500,
},
isAdmin:{
 type: 'text',
 required: true,
}, 
 password:{
     type:String,
     required: true,
     min: 6,
     max: 15,
 }, 
};

exports.UserLogin = {
    email: {
      type: 'email',
      required: true,
    },
    password: {
      required: true,
      type: 'password',
    },
  };

  exports.UserProfileUpdate = {
    id: {
      type: 'number',
      required: true,
    },
    firstName:{
        type: 'text',
        required: true,
        min: 3,
        max: 15,
    },
    lastName:{
        type: 'text',
        required: true,
        min: 3,
        max: 15,
    },
    email:{
        type: 'email',
        required: true,
        uniqueupdate: true,
        min: 6,
        max: 30,
    },
    phoneNumber:{
        type: 'number',
        required: true,
        min: 10,
        max: 10,
    },
    userName:{
        type: 'text',
        required: true,
        min: 3,
        max: 10,
    },
    token:{
        type: 'text',
        required: true,
        min: 10,
        max: 500,
    },
    isAdmin:{
        type: 'text',
        required: true,
    }, 
};