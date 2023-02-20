package admin

import (
	"EDD_Proyecto1_Fase1/structs"
	"fmt"
)

var students = structs.StudentList{}

func AcceptUserView() {

	option := 0
	end := false

	currentStudent := pendingStudents.Head

	for !end && currentStudent != nil {

		printAcceptUserView()

		fmt.Println("Estudiante actual:")
		fmt.Println("Nombre: ", currentStudent.Data.Name)
		fmt.Println("Apellido: ", currentStudent.Data.LastName)
		fmt.Println("Carnet: ", currentStudent.Data.Id)

		fmt.Println("1. Aceptar al estudiante")
		fmt.Println("2. Rechazar al estudiante")
		fmt.Println("3. Volver al menú principal")

		fmt.Scanln(&option)

		switch option {
		case 1:
			students.Add(pendingStudents.Dequeue())
			currentStudent = pendingStudents.Head
		case 2:
			pendingStudents.Dequeue()
			currentStudent = pendingStudents.Head
		case 3:
			end = true
		default:
			fmt.Println("\033[31mOpción inválida\033[0m")
			AcceptUserView()
		}

	}

	if pendingStudents.Size == 0 {
		fmt.Println("\033[31mNo hay estudiantes pendientes\033[0m")
	}

}

func printAcceptUserView() {

	fmt.Println("--- ACEPTAR USUARIOS ---")
	fmt.Println("Estudiantes pendientes: ", pendingStudents.Size)
	fmt.Println("Estudiantes registrados: ", students.Size)

}
