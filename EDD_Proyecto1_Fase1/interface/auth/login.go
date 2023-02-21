package auth

import (
	"EDD_Proyecto1_Fase1/interface/admin"
	"fmt"
	"strconv"
)

func Login() {

	option := 0
	end := false

	for !end {

		printLogin()

		fmt.Print("\nIngrese una opción: ")

		fmt.Scanln(&option)

		switch option {
		case 1:
			loginForm()
		case 2:
			end = true
			fmt.Println("Saliendo del sistema...")
			return
		default:
			fmt.Println("Opción no válida")
			Login()
		}
	}

}

func printLogin() {

	fmt.Println("\033[1;36m" + `
			  _______ _____   _____              ______       _____        _                            
			 (_______|____ \ (____ \            / _____)     (____ \      (_)                           
	 ___      _____   _   \ \ _   \ \    ___   | /  ___  ___  _   \ \ ____ _ _   _ ____          ___    
	(___)    |  ___) | |   | | |   | |  (___)  | | (___)/ _ \| |   | / ___) | | | / _  )        (___)   
			 | |_____| |__/ /| |__/ /          | \____/| |_| | |__/ / |   | |\ V ( (/ /                 
			 |_______)_____/ |_____/            \_____/ \___/|_____/|_|   |_| \_/ \____)                
	` + "\033[0m")

	fmt.Println("\n1. Iniciar sesión:")
	fmt.Println("2. Salir del sistema:")
}

func loginForm() {

	var username string
	var password string

	fmt.Print("Ingrese su nombre de usuario: ")
	fmt.Scanln(&username)

	fmt.Print("Ingrese su contraseña: ")
	fmt.Scanln(&password)

	if username == "admin" && password == "admin" {
		admin.AdminDashbaord()
	}

	id, err := strconv.Atoi(username)

	if err != nil {
		fmt.Println("El nombre de usuario debe ser un número")
	} else if admin.Students.AuthUser(id, password) {
		fmt.Println("Bienvenido")
	} else {
		fmt.Println("Nombre de usuario o contraseña incorrectos")
	}

}
