package structs

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

func createFile(filename string) {
	var _, err = os.Stat(filename)

	if os.IsNotExist(err) {
		var _, err = os.Create(filename)
		if err != nil {
			return
		}
	}
}

func writeDotFile(filename string, dot string) {
	createFile(filename)
	var file, err = os.OpenFile(filename, os.O_RDWR, 0644)
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

func GenerateImage(filename string, dot string, imageName string) {
	writeDotFile(filename, dot)
	cmd, _ := exec.Command("dot", "-Tpng", filename, "-o", filename+".png").Output()
	_ = ioutil.WriteFile(imageName, cmd, os.FileMode(0777))
}
