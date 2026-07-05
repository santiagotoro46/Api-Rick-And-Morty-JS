# Usamos una versión ligera y estable de Nginx basada en Alpine Linux
FROM nginx:1.25-alpine

# Copiamos todos los archivos estáticos de nuestro proyecto al directorio por defecto de Nginx
COPY . /usr/share/nginx/html

# Exponemos el puerto 80 que es el que usa Nginx por defecto
EXPOSE 80

# Arrancamos Nginx en primer plano para que el contenedor no se apague
CMD ["nginx", "-g", "daemon off;"]