package user

import (
	"EDD_Proyecto1_Fase1/interface/admin"
	"EDD_Proyecto1_Fase1/structs"
	"fmt"
)

func UserDasboard(student *structs.Student) {

	fmt.Println("\nBienvenido", student.Name, student.LastName, "!")

	fmt.Println("BITACORA: ")

	aux := student.Binnacle.Top

	for aux != nil {
		fmt.Println(aux.Action, " - ", aux.Time.Format("02/01/2006 15:04:05"))
		aux = aux.Next
	}

	fmt.Println("")

	fmt.Println("1. Cerrar sesión")

	var option int
	fmt.Scanln(&option)

	end := false

	for !end {
		switch option {
		case 1:
			student.Binnacle.Push("Cerró sesión")
			admin.Students.Graphviz()
			student = nil
			end = true
		default:
			fmt.Println("Opción no válida")
			UserDasboard(student)

		}
	}

}
