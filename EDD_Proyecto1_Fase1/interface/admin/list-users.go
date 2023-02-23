package admin

import (
	"fmt"
)

func ListUsersView() {
	fmt.Println("*** Estudiantes del sistema: ***")
	Students.Print()

	fmt.Println("")

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
			ListUsersView()
		}
	}
}
