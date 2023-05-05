# **EDD Go Drive**
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Estructuras de Datos
### Sección C
<br></br>

## **Manual de Usuario**
<br></br>

| Nombre | Carnet | 
| --- | --- |
| Damián Ignacio Peña Afre | 202110568 |
----

# **Descripción General**

La Facultad de Ingeniería de la Universidad de San Carlos de Guatemala requiere un sistema para almacenar archivos importantes que se ajuste a sus necesidades. Ante la falta de opciones adecuadas, se ha planteado la creación de un sistema propio llamado EDD GoDrive. La aplicación debe tener la capacidad de ser utilizada en cualquier sistema operativo, y se está considerando la opción de crearla como un sitio web utilizando Github Pages.

El objetivo del proyecto es crear un sistema similar a Google Drive, pero con la particularidad de que la Universidad de San Carlos de Guatemala será el propietario del mismo. La aplicación debe contar con características específicas que permitan el almacenamiento, creación y eliminación de carpetas y archivos, así como la modificación de nombres de archivos y carpetas ya creados. Además, se debe llevar un control de usuarios, donde cada curso de la carrera de ingeniería en sistemas tendrá un espacio de almacenamiento propio.

Como estudiante de ingeniería en sistemas, se le encomienda la tarea de desarrollar esta aplicación para la Facultad de Ingeniería. La aplicación debe ser responsiva y amigable para el usuario, de manera que sea fácil de usar y accesible desde cualquier dispositivo. En la siguiente sección, se proporcionarán detalles adicionales sobre los requisitos y funcionalidades esperados del sistema EDD GoDrive.

# **Funciones de Administrador**

La aplicación dispondrá de una página principal que permitirá a los estudiantes aceptados iniciar sesión, y al administrador acceder mediante la búsqueda en el árbol de alumnos. En el caso del administrador, no estará incluido en el árbol y solo se validará si el usuario y contraseña coinciden con "Admin".


 * Vista principal

Para acceder a las funciones de administrador, se debe contar con los permisos necesarios y una vez dentro, se encontrará con una vista principal que mostrará diferentes opciones para la gestión del sistema.

![Vista Principal](./images/1.png)


En la tabla general de permisos de usuarios, se podrá visualizar los archivos compartidos dentro del sistema. Esta tabla mostrará información relevante como el Usuario Propietario, el Usuario Destino, la Ruta del archivo, el Nombre de Archivo y el Permiso del archivo. Con esta información, el administrador tendrá un mayor control sobre el acceso a los archivos compartidos por los usuarios del sistema.
![Vista Principal](./images/2.png)


Además, se ha incluido un botón para generar el reporte de mensajes. Este botón permitirá generar un reporte detallado de los mensajes enviados y recibidos por los usuarios del sistema. De esta forma, el administrador podrá tener una visión general del uso que los usuarios están haciendo del sistema y tomar decisiones informadas en caso de ser necesario.

![Vista Principal](./images/3.png)


![Vista Principal](./images/4.png)



# **Funciones de Usuario**

* Vista principal

Para acceder a las funciones de usuario, se debe contar con los permisos necesarios y una vez dentro, se encontrará con una vista principal que mostrará diferentes opciones para la gestión del sistema.

![Vista Principal](./images/5.png)

* Mensajería

El sistema de mensajería es una herramienta que permite a los estudiantes comunicarse entre sí de manera segura. Al enviar un mensaje, éste se encripta para proteger la privacidad de la conversación, y sólo se desencripta cuando el receptor inicia sesión para leerlo. Para garantizar la seguridad e integridad del sistema de mensajería, se utiliza un sistema de almacenamiento llamado blockchain, que funciona como una lista de nodos. Cada nodo contiene información sobre el mensaje, como el emisor, el receptor, el texto encriptado y la fecha y hora de creación. También se utiliza una función de encriptación llamada SHA256 para proteger la información del mensaje y evitar la corrupción de la cadena de blockchain. En resumen, el sistema de mensajería permite a los estudiantes comunicarse de manera segura y confiable gracias a la tecnología blockchain.

![Vista Principal](./images/6.png)

* Compartir Archivos

La pestaña de compartidos es un apartado en el que el usuario podrá ver los archivos que han sido compartidos con él por otros usuarios del sistema. En este apartado, el usuario encontrará una lista de los archivos compartidos, en la que se mostrará su contenido. Si se trata de un archivo PDF, se utilizará un Iframe para mostrar el contenido. En el caso de las imágenes, se utilizará la etiqueta "img" y se mostrará la imagen cargada en la fase 2. Para los archivos de texto, se utilizará un "textarea" para visualizar el contenido del archivo. De esta manera, el usuario tendrá acceso a los archivos compartidos con él de una manera sencilla y práctica.

![Vista Principal](./images/7.png)


* Reporte de carpetas

La función Reporte Carpetas permitirá al usuario visualizar de manera gráfica las relaciones y conexiones que existen entre las diferentes carpetas del sistema. Al seleccionar esta opción, se generará un grafo dirigido que mostrará de manera clara cómo están relacionadas las carpetas y qué carpetas están conectadas entre sí.

El grafo dirigido se representará mediante nodos y flechas que indicarán la dirección de la relación. Cada nodo representará una carpeta y las flechas indicarán la dirección de la conexión entre ellas. De esta manera, el usuario podrá entender fácilmente cómo están organizados los archivos dentro del sistema y qué carpetas están relacionadas entre sí.

Esta función será muy útil para los usuarios que necesiten tener una visión general del sistema de archivos, especialmente aquellos que trabajen con grandes cantidades de archivos y carpetas. Además, el reporte podrá ser exportado en diferentes formatos para su posterior análisis o presentación.

![Vista Principal](./images/8.png)