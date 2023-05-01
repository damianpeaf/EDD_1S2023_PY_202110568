
export class Student {

    constructor(name, id, password, rootFolder) {
        this.name = name;
        this.id = id;
        this.password = password;
        this.rootFolder = rootFolder;
    }

    getValue() {
        return this.id;
    }

    getGraphvizLabel() {
        return this.id + "\\n" + this.name;
    }


}