package admin

import (
	"fmt"
	"strconv"
)

func ListPendingUsers() {

	aux := PendingStudents.Head

	for aux != nil {

		fmt.Println("Nombre: " + aux.Data.Name + " Apellido: " + aux.Data.LastName + " Carnet: " + strconv.Itoa(aux.Data.Id))
		fmt.Println("******************************************************")
		aux = aux.Next
	}

	fmt.Println("1. Regresar")

	var option int
	fmt.Scanln(&option)

	end := false

	for !end {

		switch option {
		case 1:
			end = true
		default:
			fmt.Println("Opción no válida")
		}
	}

}
