//Querys = Filtros 

db.ubicaciones.insertMany([
    {"nombre":"KFC",
    "ciudad":"Lima",
    "zona":21},

    {"nombre":"KFC",
    "ciudad":"Arequipa",
    "zona":14},

    {"nombre":"Burger King",
    "ciudad":"Chincha",
    "zona":92},

    {"nombre":"KFC",
    "ciudad":"Chincha",
    "zona":12},

    {"nombre":"KFC",
    "ciudad":"Ica",
    "zona":10},

    {"nombre":"Burger King",
    "ciudad":"Chiclayo",
    "zona":99},

    {"nombre":"Starbucks",
    "ciudad":"Arequipa",
    "zona":55},

    {"nombre":"KFC",
    "ciudad":"Lima",
    "zona":20},

    {"nombre":"Pizza Hut",
    "ciudad":"Cuzco",
    "zona":10}
])

//Mongodb nos permite saltarnos documentos con la  funcion skip(cantidad a saltarnos)
db.ubicaciones.find({}).skip(5).pretty()

//ordenar de forma descendente
db.ubicaciones.find({}).sort({"nombre":-1})

//contar la cantidad de documentos
db.ubicaciones.find({}).count()

//condicional AND
db.ubicaciones.find({
    $and: [{"nombre": "KFC"},
    {"zona":10}]
})

//condicional OR
db.ubicaciones.find({
    $or: [{"ciudad": "Lima"},
    {"zona":10}]
})

//AND y OR
db.ubicaciones.find({
    $and: [{"ciudad": "Lima"}],
    $or: [{"zona":42 },
    {"zona":30}]
})


//IN
db.ubicaciones.find({
    ciudad:{$in:["Lima", "Chincha"]}
})


//$gte
db.ubicaciones.find({
    "nombre":"KFC",
    "zona":{
        "$gte":10 
    }
})

//proyecciones
db.ubicaciones.find({},{nombre:1,_id:0})


//IN para buscar palabras en posicion x 

db.ubicaciones.find({
    ciudad:{$in:[/^Li/,/^Ch/,/^Are/]}
})