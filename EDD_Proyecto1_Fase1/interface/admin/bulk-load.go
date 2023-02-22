package admin

import (
	"EDD_Proyecto1_Fase1/structs"
	"encoding/csv"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/AlecAivazis/survey/v2"
)

func bulkLoadView(relatedAdmin *structs.Admin) {

	answers := struct {
		File string
	}{}

	err := survey.Ask(q, &answers)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	file, err := os.Open(answers.File)

	if err != nil {
		fmt.Println("Error al abrir el archivo")
		return
	}

	defer file.Close()

	reader := csv.NewReader(file)
	lineCount := 0

	for {
		record, err := reader.Read()

		if lineCount == 0 {
			lineCount++
			continue
		}
		if err != nil {
			if err.Error() == "EOF" {
				break
			}
			fmt.Println("Error al leer la línea:", err)
			return
		}

		fullname := strings.Split(record[1], " ")
		name := fullname[0]
		id, _ := strconv.Atoi(record[0])
		lastname := ""
		if len(fullname) > 1 {
			lastname = fullname[1]
		} else {
			lastname = ""
		}
		newStudent := structs.Student{
			Id:       id,
			Name:     name,
			LastName: lastname,
			Password: record[2],
			Binnacle: &structs.Binnacle{},
		}
		PendingStudents.Enqueue(newStudent)
		relatedAdmin.AddRecord("Se ha agregado el usuario " + record[1] + " a la lista de espera [Carga masiva]")
		PendingStudents.Graphviz()

		fmt.Println("Usuario registrado exitosamente!")
	}

}

func suggestFiles(toComplete string) []string {
	files, _ := filepath.Glob(toComplete + "*")
	return files
}

var q = []*survey.Question{
	{
		Name: "file",
		Prompt: &survey.Input{
			Message: "Cual es el archivo de entrada?",
			Suggest: suggestFiles,
		},
		Validate: survey.Required,
	},
}
