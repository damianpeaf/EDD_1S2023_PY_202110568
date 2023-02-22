package structs

type Admin struct {
	Id       int
	Username string
	Password string
	Binnacle *Binnacle
}

func (admin *Admin) AddRecord(action string) {

	admin.Binnacle.Push(action)

	// Generate graphviz

	content := "digraph G {\n"
	content += admin.Binnacle.Graphviz(admin.Username)

	content += "}"

	GenerateImage("Admin_"+admin.Username, content)

}

type AdminNode struct {
	Next *AdminNode
	Prev *AdminNode
	Data Admin
}
