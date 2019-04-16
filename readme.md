// requisitos
node 8.x
npm 6.x
platformio (IDE)

// server
ingresar a la carpeta iot_server/

1. npm install

2. crear la base de datos allix_iot_restaurante.

3. cambiar las credenciales en config/database.js y config/mqtt.js
	
4. migrar la base de datos con el siguiente comando

	node_modules/.bin/sequelize db:migrate

5. npm start


// CLIENT
1. npm install
2. npm start

// wemos
cargar el codigo en el micro con el IDE platformio