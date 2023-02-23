package admin

import (
	"EDD_Proyecto1_Fase1/structs"
	"fmt"
)

func AdminDashbaord(relatedAdmin *structs.Admin) {

	option := 0
	end := false

	for !end {
		printAdminDashboard()

		fmt.Print("Ingrese una opción: ")
		fmt.Scanln(&option)

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
	}

}

func printAdminDashboard() {

	fmt.Println("\033[1;36m" + `
	_  _  _               _       _          _____             _                          _    _  _  _ 
	( \| |/ )     /\      | |     (_)        (____ \           | |                        | |  ( \| |/ )
	 \  _  /     /  \   _ | |____  _ ____     _   \ \ ____  ___| | _   ___   ____  ____ _ | |   \  _  / 
	(_ (_) _)   / /\ \ / || |    \| |  _ \   | |   | / _  |/___) || \ / _ \ / _  |/ ___) || |  (_ (_) _)
	 /     \   | |__| ( (_| | | | | | | | |  | |__/ ( ( | |___ | |_) ) |_| ( ( | | |  ( (_| |   /     \ 
	(_/|_|\_)  |______|\____|_|_|_|_|_| |_|  |_____/ \_||_(___/|____/ \___/ \_||_|_|   \____|  (_/|_|\_)
			  _______ _____   _____              ______       _____        _                            
			 (_______|____ \ (____ \            / _____)     (____ \      (_)                           
	 ___      _____   _   \ \ _   \ \    ___   | /  ___  ___  _   \ \ ____ _ _   _ ____          ___    
	(___)    |  ___) | |   | | |   | |  (___)  | | (___)/ _ \| |   | / ___) | | | / _  )        (___)   
			 | |_____| |__/ /| |__/ /          | \____/| |_| | |__/ / |   | |\ V ( (/ /                 
			 |_______)_____/ |_____/            \_____/ \___/|_____/|_|   |_| \_/ \____)                
	` + "\033[0m")

	fmt.Println(`
	               _                     _   
	___  ___  ____(_)__  ___  ___ ___   (_)  
   / _ \/ _ \/ __/ / _ \/ _ \/ -_|_-<  _     
   \___/ .__/\__/_/\___/_//_/\__/___/ (_)    
	  /_/                                    
	`)

	fmt.Println("\n1. Ver estudiantes pendientes:")
	fmt.Println("2. Ver estudiantes del sistema:")
	fmt.Println("3. Registrar nuevo estudiante:")
	fmt.Println("4. Carga masiva de estudiantes:")
	fmt.Println("5. Cerrar sesión:")
	fmt.Println("6. Listar usuarios pendientes:")

}
