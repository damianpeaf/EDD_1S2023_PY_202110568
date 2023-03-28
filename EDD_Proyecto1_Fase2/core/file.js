import { PermissionDetail } from "./index.js";

export class File {

    constructor(name, content) {
        this.name = name;
        this.content = content;
    }


    getValue() {
        return this.name;
    }

}

export class FileDetail {

    constructor(file) {
        this.file = file;
        this.permisssionsDetails = [];
    }

    addPermission(student, permission) {
        this.permisssionsDetails.push(
            new PermissionDetail(permission, student)
        );
    }
}