package admin

import (
	"EDD_Proyecto1_Fase1/structs"
	"fmt"
)

var PendingStudents = structs.StudentQueue{}

func AddUserView(relatedAdmin *structs.Admin) {

	printAddUserView()

	var name, lastName, password string
	var id int

	fmt.Print("Nombre: ")
	fmt.Scanln(&name)

	fmt.Print("Apellido: ")
	fmt.Scanln(&lastName)

	fmt.Print("Contraseña: ")
	fmt.Scanln(&password)

	fmt.Print("ID: ")
	fmt.Scanln(&id)

	newStudent := structs.Student{
		Id:       id,
		Name:     name,
		LastName: lastName,
		Password: password,
		Binnacle: &structs.Binnacle{},
	}

	PendingStudents.Enqueue(newStudent)

	fmt.Println("Usuario registrado exitosamente!")
	PendingStudents.Graphviz()
	relatedAdmin.AddRecord("Se ha agregado el usuario " + name + " a la lista de espera")

}

func printAddUserView() {

	fmt.Println("--- REGISTRO DE USUARIOS ---")
	fmt.Println("Rellene los siguientes campos para registrar un nuevo usuario:")

}
