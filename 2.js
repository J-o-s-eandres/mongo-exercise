user13={
    "username": "Joseandres",
    "email": "joseandresmontesino@gmail.com",
    "age": 22,
    "status":"Active",
    "addres":{
        "zip":51,
        "country": "PE"
    },
    "courses":["Python","MongoDB","MySQL","Oracle","SQLServer"],
    "comments":[
        {
            body: "Best course",
            like:true,
            tags:['MongoDB']
        },
        {
            body: "Super excited",
            like: true
        },
        {
            body:"The course is OK"
        },
        {
            body:"Bad courses, Im disappointed",
            like:false,
            tags:['bad','course','MongoDB']
        }
    ]
};


user14= {

    'username': 'juan',
    'email': 'juanperez@gmail.com',
    'age' : 30,
    'status': 'active',
    'comments': [
        {
            body: 'Best course',
            like:true
        }
    ]

};


user15={
    'username' : 'Adriana',
    'email' : "AdriH@gmail.com",
    "age" : 17,
    'status': 'active',
    'comments':[
        {
            body: 'Best course',
            like: false       
        }
    ]
};

db.users.insertMany(

    [user13,user14,user15]
);

// Obtener todos los usuarios que radiquen en PE

db.users.find(  
    {
        'addres.country':'PE'
    },
    {
        username: true,
        'addres.zip' : true
    }
);

// Actualizar el codigo postal

db.users.updateMany(
    {
        'addres.zip': {$exists:true}
    },
    {
        $set:{
            'addres.zip': 110
        }
    }
);

//añadir direccion a todos los usuarios que no la tengan

db.users.updateMany(
    {
        'addres': {$exists:false}
    },
    {
        $set:{
            'addres': {

                country:'MX',
                zip:2019
            }
        }
    }
);

//agregar latitud y longitud al domento emvevido del user12
db.users.updateOne(
    {
        username: 'user12'
    },
    {
        $set:{
            'addres.location':{
                lat: -180,
                lon:250
            }
        }
    }
);
// Obtener todos los usuarios que tengan en su listado de cursos Python
db.users.find({
    courses: {$exists: true}
})
// Obtener todos los usuarios con por lo menos un comentario positivo
db.users.find(
 {
    comments:{

        $elemMatch:{
            //like:true
            $and:[
                {like: true},
                {tags:{$exists: true}}
             ]
           }

        }
    },
    {
        comments: true
    }
);

//$elemMatch con esta funcion podemos fltrar sobre atributos de elementos dentro de listados 


// Añadir un nuevo comentario positivo al listado de comentarios para el usuario Joseandres
db.users.updateOne(
    {   
        username:'Joseandres'
    },
    {
        $push:{
            comments:{
                like:true,
                body:"El curso de Mongodb esta bueno"
            }
        }
    }
);

//agregar un nuevo curso
db.users.updateOne(
    {   
        username:'Joseandres'
    },
    {
        $push:{
            courses:'GO'
        }
    }
);

//$push para añadir un nuevo documento al final de la lista el elemento puede ser de cualquier tipo (documento,float,int, etc...)

//Añadir una nueva etiqueta al 4 comentarios del usuario Joseandres

db.users.updateOne(
    {
        username:'Joseandres'
    },{
        $push:{
            'comments.3.tags':'Tutor'
    }   
  }
);

// Actualiza el segundo comentario del usuario Joseandres

db.users.updateOne(
    {
        username:'Joseandres'
    },
    {
        $set:{
            'comments.1.body':'Excelente Curso'
        }
    }
);

//Actualiza el comentario negativo del usuario Joseandres

db.users.updateOne(
    {
        username:'Joseandres',
        'comments.like':false  //nos permite conocer el indice de los documentos dentro de la lista que queremos actualizar
    },
    {
        $set:{
            'comments.$.body':'El curso esta buenisimo',
            'comments.$.body':true
        },
        $unset:{
            'comments.$.tags':true
        }
    }
);
//como no conocemos el indice usamos un comodin $ este sera reemplazado por el indice de todos los usuarios que cumplan la condicion



