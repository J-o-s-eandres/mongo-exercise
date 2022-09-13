//usuario con reol o privilegio para leer y escribir
db.createUser({user:'Joseandres',pwd:'1234567890',roles:['readWrite']})

//usuario administrador
db.createUser({user:'Joseandres_Admin',pwd:'1234567890',roles:['readWrite','dbAdmin']})