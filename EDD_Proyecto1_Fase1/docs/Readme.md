

# Manual Técnico

## Descripción

El presente proyecto se trata de un panel de administración que registra estudiantes para que puedan acceder a un sistema de archivos. La información de los estudiantes se guarda en diferentes estructuras de datos, incluyendo listas doblemente enlazadas, pilas y colas. Las listas doblemente enlazadas, pilas y colas son estructuras de datos fundamentales en la programación y son utilizadas en muchos sistemas y aplicaciones en la vida real.

El uso de estas estructuras de datos permite el acceso y almacenamiento eficiente de información de los estudiantes, lo que mejora el rendimiento y la escalabilidad del sistema. Este manual técnico proporciona una guía detallada sobre cómo utilizar estas estructuras de datos en este proyecto y cómo implementar las funcionalidades necesarias para el registro y acceso de estudiantes.

En las siguientes secciones, encontrará una descripción detallada de cada estructura de datos utilizada en este proyecto, así como una explicación de cómo se implementan en el sistema. Además, se proporcionan ejemplos prácticos y código fuente para ayudarlo a comprender mejor cómo funcionan estas estructuras de datos y cómo utilizarlas en su propio proyecto.


## Módulos


### Structs

La estructura de datos encargada de almacenar los usuarios finales que utilizarán la aplicación se puede encontrar en el archivo `StudentList.go`. 

Específicamente se utilizó una lista doblemente enlazada para resolver esta problemática. Dicho estrucura de datos requiere de un componente fundamental, el nodo. Este nodo almacenerá la información del estudiante, en este caso, el nombre y la identificación. 

```go

type Student struct {
	Id       int
	Name     string
	LastName string
	Password string
	Binnacle *Binnacle
}

type StudentNode struct {
	Next *StudentNode
	Prev *StudentNode
	Data Student
}
```

Prosiguiendo con la lógica de la lista doblemente enlazada, se implementó la estructura de la lista en sí. Esta estructura contiene un puntero al nodo de cabeza y cola, así como el tamaño de la lista. 

```go
type StudentList struct {
	Head *StudentNode
	Tail *StudentNode
	Size int
}
```

Entre algunos métodos destacables de la lista doblemente enlazada se encuentran el método `Add` que permite agregar un nuevo estudiante a la lista y que se realice de forma ordenada:

```go

// Add agrega un nuevo estudiante a la lista en orden ascendente por ID.
func (list *StudentList) Add(student Student) {
	// Crear un nuevo nodo con el estudiante
	newNode := &StudentNode{Data: student}

	if list.Head == nil {
		// Si la lista está vacía, el nuevo nodo será la cabeza y la cola
		list.Head = newNode
		list.Tail = newNode
	} else {
		// Verificar si el estudiante ya está en la lista
		aux := list.Head

		for aux != nil && aux.Data.Id != student.Id {
			aux = aux.Next
		}

		if aux != nil {
			// El estudiante ya está en la lista, salir sin agregar nada
			return
		}

		// Agregar en orden ascendente por ID

		// Empezar por la cabeza de la lista
		aux = list.Head

		// Encontrar el nodo
		for aux != nil && aux.Data.Id < student.Id {
			aux = aux.Next
		}

		if aux == nil {
			// El nuevo nodo tiene un ID mayor que cualquier otro en la lista,
			// por lo que se agrega al final de la lista
			list.Tail.Next = newNode
			newNode.Prev = list.Tail
			list.Tail = newNode

		} else if aux.Prev == nil {
			// El nuevo nodo tiene un ID menor que cualquier otro en la lista,
			// por lo que se agrega al principio de la lista
			list.Head.Prev = newNode
			newNode.Next = list.Head
			list.Head = newNode

		} else {
			// El nuevo nodo debe agregarse en el medio de la lista
			aux.Prev.Next = newNode
			newNode.Prev = aux.Prev
			newNode.Next = aux
			aux.Prev = newNode
		}

	}
	list.Size++
}

```

De manera similar sucede con la lista de administradores, la cual se encuentra en el archivo `AdminList.go`. Y pretende segmentar de mejor manera las acciones que pueden realizar estos tipos de usuarios. 

Cabe destacar que tanto el objeto administrador como estudiante comparte una bitacora que se encarga de almacenar las acciones que se realizan en el sistema. Además cada estructura realizada en el proyecto cuenta con métodos para su visualización en graphviz. 

Particularmente la bitacora se encuentra en el archivo `Binnacle.go` y se implementó como una pila. 

```go

type BinnacleRecord struct {
	Action string
	Time   time.Time
	Next   *BinnacleRecord
}

// Pila de acciones
type Binnacle struct {
	Top    *BinnacleRecord
	Bottom *BinnacleRecord
	Size   int
}


// Push agrega un nuevo registro al inicio de la estructura de pila (Binnacle).
// Recibe un parámetro 'action' de tipo string que representa la acción que se registra en el binnacle.
func (binnacle *Binnacle) Push(action string) {

	// Creamos un nuevo nodo 'BinnacleRecord' con el valor de 'action' y la hora actual del sistema a través de la función 'time.Now()'.
	newNode := &BinnacleRecord{Action: action, Time: time.Now()}

	// Verificamos si la pila está vacía, es decir, si el puntero 'Top' es 'nil'.
	if binnacle.Top == nil {

		// Si la pila está vacía, el puntero 'Top' y el puntero 'Bottom' apuntarán al mismo nodo recién creado.
		binnacle.Top = newNode
		binnacle.Bottom = newNode

	} else {

		// Si la pila ya contiene al menos un elemento, el nuevo nodo se establece como el nuevo nodo superior de la pila,
		// apuntando al nodo anteriormente en la parte superior de la pila.
		newNode.Next = binnacle.Top
		binnacle.Top = newNode
	}

	// Finalmente, el tamaño de la pila ('Size') se incrementa en 1.
	binnacle.Size++
}
```

Por último, se implementó una cola de espera para los estudiantes que desean ingresar al sistema y estan pendientes de verificación. Esta estructura se encuentra en el archivo `StudentQueue.go` y se implementó como una cola. 

```go
type StudentQueue struct {
    Head *StudentNode
    Tail *StudentNode
    Size int
}

// Enqueue agrega un estudiante al final de la cola
func (queue *StudentQueue) Enqueue(student Student) {

    // Creamos un nuevo nodo con los datos del estudiante
    newNode := &StudentNode{Data: student}

    // Si la cola está vacía, el nuevo nodo se convierte en la cabeza y la cola
    if queue.Head == nil {
        queue.Head = newNode
        queue.Tail = newNode
    } else {
        // Verificar si el estudiante ya está en la cola

        aux := queue.Head

        for aux != nil && aux.Data.Id != student.Id {
            aux = aux.Next
        }

        if aux != nil {
            return
        }

        // Si el estudiante no está en la cola, se agrega al final
        queue.Tail.Next = newNode
        queue.Tail = newNode
    }

    // Se incrementa el tamaño de la cola
    queue.Size++
}

// Dequeue elimina el primer estudiante de la cola y lo devuelve
func (queue *StudentQueue) Dequeue() Student {

    // Si la cola está vacía, se devuelve un estudiante vacío
    if queue.Head == nil {
        return Student{}
    }

    // Guardamos el estudiante en la cabeza para devolverlo
    student := queue.Head.Data

    // El siguiente estudiante se convierte en la nueva cabeza
    queue.Head = queue.Head.Next
    queue.Size--

    // Se devuelve el estudiante guardado anteriormente
    return student
}
```


## interface

### Admin

El panel de adminitración se encuentra en el archivo `admin.go` y se encarga de enlazar las opciones que pueden realizar los administradores con sus respectivas funciones. 

```go

switch option {
	case 1:
		AcceptUserView(relatedAdmin)
	case 2:
		ListUsersView()
	case 3:
		AddUserView(relatedAdmin)
	case 4:
		bulkLoadView(relatedAdmin)
	case 5:
		end = true
		relatedAdmin.AddRecord("Cerró sesión")
	case 6:
		ListPendingUsers()
	default:
		fmt.Println("\033[31mOpción inválida\033[0m")
}

```

El administrador puede realizar las siguientes acciones:

- Aceptar usuarios pendientes de verificación
- Listar usuarios
- Agregar usuarios
- Cargar usuarios de forma masiva

> **NOTA**: Al realizar cualquiera de dichas acciones se registra en la bitacora del administrador la acción realizada. Y se realiza su correspondiente visualización en graphviz.

Para facilitar la elección del archivo a utilizarse para la carga masiva se utilizó el paquete `github.com/AlecAivazis/survey/v2`

### Usuario

El panel de usuario regultar (o estudiantes) se encuentra en el archivo `user.go` y se encaraga de desplegar la bitacora del usuario. 

```go
func UserDasboard(student *structs.Student) {

	fmt.Println("\nBienvenido", student.Name, student.LastName, "!")

	fmt.Println("BITACORA: ")

	aux := student.Binnacle.Top

	for aux != nil {
		fmt.Println(aux.Action, " - ", aux.Time.Format("02/01/2006 15:04:05"))
		aux = aux.Next
	}

	fmt.Println("")

	// ...
}

```

### Autenticación

El archivo `auth.go` se encarga de realizar la autenticación de los usuarios. 

```go

func loginForm() {

	var username string
	var password string

	// Se solicita el nombre de usuario al usuario
	fmt.Print("Ingrese su nombre de usuario: ")
	fmt.Scanln(&username)

	// Se solicita la contraseña al usuario
	fmt.Print("Ingrese su contraseña: ")
	fmt.Scanln(&password)

	// Se valida si el usuario es un administrador
	relatedAdmin := AdminList.ValidateAdmin(username, password)

	// Si el usuario es un administrador, se muestra el dashboard de administrador
	if relatedAdmin != nil {
		relatedAdmin.AddRecord("Inicio de sesión")
		admin.AdminDashbaord(relatedAdmin)
	}

	// Si el nombre de usuario no es un número, se muestra un mensaje de error
	// En caso contrario, se valida si el usuario es un estudiante
	id, err := strconv.Atoi(username)

	if err != nil {
		fmt.Println("El nombre de usuario debe ser un número")
	} else {
		relatedUser := admin.Students.AuthUser(id, password)
		if relatedUser != nil {
			relatedUser.Binnacle.Push("Inicio de sesión")

			// Se muestra el grafo de usuarios
			admin.Students.Graphviz()
			user.UserDasboard(relatedUser)
		} else {
			fmt.Println("Nombre de usuario o contraseña incorrectos")
		}
	}

}

```