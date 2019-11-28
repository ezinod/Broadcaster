exports.RecordCreation ={
    title:{
        type: 'string',
        required: true,
        unique: true,
        min: 6,
        max: 100,
    },
    user_id:{
        type: 'number',
        required: true,
    },
    status:{
        type: 'text',
        required: true,
    },
    type:{
        type: 'string',
        required: true,
        min: 4,
        max: 15,
    },
    description:{
        type: 'string',
        required: true,
        min: 100,
        max: 1000,
    }, 
    comment: {
        type: 'string',
        min: 10,
        max: 100,
      },
};

exports.RecordUpdate ={
    title:{
        type: 'string',
        required: true,
        unique: true,
        min: 10,
        max: 100,
    },
    user_id:{
        type: 'number',
        required: true,
    },
    status:{
        type: 'stringt',
        required: true,
    },
    category:{
        type: 'string',
        required: true,
        min: 4,
        max: 255,
    },
    description:{
        type: 'string',
        required: true,
        min: 100,
        max: 1000,
    }, 
    images:{
        type:'image',
    },
    videos:{
        type:'image'
    },  
    comment: {
        type: 'string',
        min: 10,
        max: 100,
      },
};