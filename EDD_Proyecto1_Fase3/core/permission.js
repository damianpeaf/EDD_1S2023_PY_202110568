
export class Permission {
    constructor(name) {
        this.name = name;
    }

    getValue() {
        return this.name;
    }
}

export class PermissionDetail {

    constructor(permission, student) {
        this.permission = permission;
        this.student = student;
    }

}