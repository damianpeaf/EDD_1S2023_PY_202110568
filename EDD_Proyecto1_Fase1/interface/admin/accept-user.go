package admin

import (
	"EDD_Proyecto1_Fase1/structs"
	"fmt"
)

var Students = structs.StudentList{}

func AcceptUserView() {

	option := 0
	end := false

	currentStudent := PendingStudents.Head

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
			Students.Add(PendingStudents.Dequeue())
			currentStudent = PendingStudents.Head
		case 2:
			PendingStudents.Dequeue()
			currentStudent = PendingStudents.Head
		case 3:
			end = true
		default:
			fmt.Println("\033[31mOpción inválida\033[0m")
			AcceptUserView()
		}

	}

	if PendingStudents.Size == 0 {
		fmt.Println("\033[31mNo hay estudiantes pendientes\033[0m")
	}

}

func printAcceptUserView() {

	fmt.Println("--- ACEPTAR USUARIOS ---")
	fmt.Println("Estudiantes pendientes: ", PendingStudents.Size)
	fmt.Println("Estudiantes registrados: ", Students.Size)

}
