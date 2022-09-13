// Crear un Documento
// Documentos -> tipo Json

user1={

    'username' : 'user1',
    'age' : 22,
    'email' : 'user1@gmail.com'

};


user2={

    'username' : 'user2',
    'age' : 32,
    'email' : 'user2@gmail.com'

};

user3={

    'username' : 'user3',
    'age' : 19,
    'email' : 'user3@gmail.com'

};


// Se valida que la base de datos exista.
// Se valida que la coleccion de datos exista.

db.users.insert(user3)

// objectId -> 4
// 1. - (Timestamp)
// 2. - (Identificador para el servidor)
// 3. - (PID)
// 4. - (AutoIncrement)

db.users.insertOne()

user4={

    'username' : 'user4',
    'age' : 26,
    'email' : 'user4@gmail.com'

};

db.users.insertMany([

{

    'username' : 'user5',
    'age' : 24,
    'email' : 'user5@gmail.com'

},
{

    'username' : 'user6',
    'age' : 23,
    'email' : 'user6@gmail.com'

},
{

    'username' : 'user7',
    'age' : 27,
    'email' : 'user7@gmail.com'

}
]);


db.users.save(user8)

// si el objeto no existe lo crea. (_id)
// si el objeto si existe se actualiza. (_id)

user8={

    'username' : 'user8',
    'age' : 62,
    'email' : 'user8@gmail.com'
};

//agregado de atributo status
db.users.insertMany([

    {
    
        'username' : 'user9',
        'age' : 24,
        'email' : 'user9@gmail.com',
        'status' : 'inactive'   
    },
    {
    
        'username' : 'user10',
        'age' : 23,
        'email' : 'user10@gmail.com',
        'status' : 'active'
    
    },
    {   
        'username' : 'user11',
        'age' : 27,
        'email' : 'user11@gmail.com',
        'status' : 'inactive'
    
    },
    {
        'username' : 'user12',
        'age' : 12,
        'email' : 'user12@gmail.com',
        'status' : 'active'
    }
]);


// Obtener el usuario con username user7
db.users.find({ // Retorna un cursor 
    username:"user7"
});

db.users.findOne({// Retorna un documento se usa cuando se sabe que vas a Obtener 1 solo documento
    username:"user7"
});

// Obtener todos los usuarios con una edad mayor a 30
db.users.find({
    age : { $gt: 30 }});

//Operadores relacionales en mongo:
// gt (>) mayor que
//gte (>=)mayor igual que
//lt (<) menor que
//lte (<=) menor igual que
//ne (!=) diferente 

// Obtener la cantidad de usuarios con una edad menor a 50
// Los objetos de tipo cursor tienen el metodo -> count()
db.users.find({
    age : { $lt: 50 }}).count();

// Obtener todos los usuarios con una edad mayor a 10 y cuyo estatus sea activo

db.users.find({
    $and: [
       { age: {$gt :10}},
       {status: 'active'}
    ]
})

// Obtener todos los usuarios cuya edad no sea 11

db.users.find({

    age: {$ne: 20}

})

// Obtener todo slos usuarios que tengan por edad : 27 o 40 o 11

// Opcion 1 con OR

db.users.find({
    $or : [
        {age: 27},
        {age : 40},
        {age : 11}
    ]
});

// opcion 2 con ($in) buscar sobre listado
db.users.find({
    age: {$in:[27,40,11]}
});

// Obtener todos los usuarios con atributo estatus

db.users.find({
    status:{$exists: true}
});

// Obtener todos los usuarios con estatus activo

// Opcion 1 directamente consultamos si esta activo el status
db.users.find({
    status:'active'
});

//opcion 2 validamos que status exista y luego si cumple la condicion de activo

db.users.find({
    $and:[
        {status: {$exists: true}},
        {status: 'active'}
    ]
});

// Obtener todos los usuarios con estatus activo y correo electronico

db.users.find({
    $and:[
        {status: {$exists: true}},
        {status: 'active'},
        {email: {$exists: true}}
    ]
});

// Obtener el usuario con mayor edad
// El cursor tiene el metodo sort()que nos permite ordenar, le pasamos un documento 
//con el atributo que le servira para ordenar y -1 para orden descendente y 1 para orden ascendente
//con limit limitamos la cantidad de documentos que queremos 

db.users.find().sort({age:-1}).limit(1);



// Obtener a los 3 usuarios mas jovenes 

db.users.find().sort({age:1}).limit(3);


// Obtener los usuarios que su correo termine en .com

db.user.find({email: /.com/});

// Obtener los usuarios que su username inicie con user

db.user.find({email: /^user/});



// Obtener si el caracter existe en el string (sin importar si es al inicio o al final)

db.user.find({email: /@/});


// Saltar (ignorar) los primeros 7 documentos

db.users.find().skip(7);


// FIND , SORT,LIMIT, SKIP --> retornan cursores
//Count y Pretty se pueden usar con tipos cursores

// un cursor es un objeto el cual nos permite conocer todos aquellos objetos obtenidos a traves de una consulta


//Guardar cursor en variables 
//despues de consumir (usar) el cursor este se cierra y la variable no esta  disponible
//se tendria que crear N cantidad de veces 

var users = db.users.find();

db.users.find().forEach(user => print(user.username));


//proyecciones : Es la forma en la cual podemos obtener atributos de los documentos de forma precisa

db.users.find(
    {
        age :{$gte: 50}
    }, //Definimos las condiciones
    {
        _id:false,// el id siempre se mostrara a menos que coloques false
        username:true,//como segundo argumento colocamos los atributos que queremos ver a partir de una consulta
        age:true
    }
);

//ACTUALIZAR

//1. - SAVE

//obtenemos el documento
var user = db.user.findOne()

//lo actualizamos y agregamos 1 atributo nuevo
user.age=21
user.email= 'joseandresmontesino@gmail.com'
user.status = 'active'

//usamos save para guardar los cambios (Actualizamos)
db.users.save(user);

//2. - UPDATE

db.users.update({
    "_id" : ObjectId("62abc699425ed408f471f582")// condicion que el docuemnto debe cumplir para ser actualizado
    },
    {
        $set :{
            username: 'Adriana',
            email: 'AdriHernandez@gmail.com',//atributos que deseas actualizar (si el atributo existe lo actualiza y sino lo crea)
            age:18,
            direccion:"grocio"
        }
    }
);


db.users.update({
    "_id" : ObjectId("62abc699425ed408f471f582")
     },
     {
        $unset :{
            direccion:true//quita (borra) atributos no deseados 
        }
    }
);




// El metodo update (por default) solo actualiza un documento
// si quisieramos actualizar multiples documentos debemos pasar un 3er argumento


//db.ubicaciones.update({"_id" : ObjectId("62ba1c4892801a5bbe758c3f")},{$set:{zona:22}})

db.users.update(
    {
       status: 'inactive'     
    },
    {
        $set:{
        status:'active'
        }
    },
    {
        multi:true // actualizar multiples documentos true
    }
)

//updateOne
db.users.updateOne(

    {
        "username": "user9"
    },
    {
        $set:
        {
            status: 'inactive'
        }
    }
)


//updateMany
db.users.updateMany(

    {
        email: {$exists: true}
    },
    {
        $set:
        {
            bio: "Añade tu biografia"
        }
    }
)






//incrementar en 1 la edad de todos los usuarios
//sirve para numeros enteros (sumar o restar)

db.users.updateMany(
    {
        
    },
    {
        $inc:
        {
            age: 1
        }
    }
)


//remove

db.users.remove({
    status: 'inactive'
})



//eliminar coleccion

db.users.drop()

//eliminar base de datos

db.dropDatabase()




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