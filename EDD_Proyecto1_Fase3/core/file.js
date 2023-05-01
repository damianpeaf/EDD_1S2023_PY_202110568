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

        // Validate if student already has permission
        const permissionDetail = this.permisssionsDetails.find((permissionDetail) => permissionDetail.student.id === student.id)

        if (permissionDetail) {
            permissionDetail.permission = permission;
            return;
        }

        this.permisssionsDetails.push(
            new PermissionDetail(permission, student)
        );
    }
}