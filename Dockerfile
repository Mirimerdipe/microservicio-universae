# Single stage: Use the official Node.js image
# Etapa única: Uso de la imagen oficial de Node.js 
FROM node:18

# Create a working directory inside the container
# Creación un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copy required files and install dependencies
# Copiar archivos necesarios e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
# Copiar el resto de la aplicación
COPY . .

# Expose the port used by the microservice
# Exponer el puerto que usa el microservicio
EXPOSE 3000

# Command to run the app
# Comando para ejecutar la app
CMD ["node", "microservicio.js"]
