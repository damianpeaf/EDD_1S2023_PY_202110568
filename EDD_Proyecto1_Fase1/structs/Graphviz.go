package structs

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

func createFile(filename string) {
	path := "reports/" + filename + ".dot"
	var _, err = os.Stat(path)

	if os.IsNotExist(err) {
		var _, err = os.Create(path)
		if err != nil {
			return
		}
	}
}

func writeDotFile(filename string, dot string) {
	createFile(filename)
	var file, err = os.OpenFile("reports/"+filename+".dot", os.O_RDWR, 0644)
	if err != nil {
		fmt.Println(err)
	}

	defer file.Close()
	_, err = file.WriteString(dot)
	if err != nil {
		return
	}

	err = file.Sync()
	if err != nil {
		return
	}
}

func GenerateImage(filename string, dot string) {
	writeDotFile(filename, dot)
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpg", "reports/"+filename+".dot").Output()
	_ = ioutil.WriteFile("reports/"+filename+".jpg", cmd, os.FileMode(0777))
}
