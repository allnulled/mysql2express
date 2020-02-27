const Model = require(__dirname + "/Model.js");

class RoleAndPrivilege extends Model {

	static get MODEL_INFO() {
		return {
            "database": "database1",
            "model": "RoleAndPrivilege",
            "table": "role_and_privilege",
            "attributes": [
                "id",
                "id_role",
                "id_privilege",
                "created_at",
                "updated_at"
            ],
            "primaryKeys": [
                "id"
            ],
            "foreignKeys": [
                {
                    "constraint": "role_and_privilege_ibfk_1",
                    "column": "id_role",
                    "referencedTable": "role",
                    "referencedColumn": "id"
                },
                {
                    "constraint": "role_and_privilege_ibfk_2",
                    "column": "id_privilege",
                    "referencedTable": "privilege",
                    "referencedColumn": "id"
                }
            ]
        };
	}

	static get MODEL_ATTRIBUTES() {
		return {
            "id": {
                "order": 1,
                "model": "RoleAndPrivilege",
                "table": "role_and_privilege",
                "column": "id",
                "type": "number",
                "typeTerm": "int",
                "subtype": "int",
                "default": null,
                "extra": "auto_increment",
                "isPrimaryKey": true,
                "isAutoIncrement": true,
                "isNullable": false,
                "isFloat": true,
                "isUnsigned": false,
                "isForeignKey": false,
                "isUnique": true,
                "referencesTo": [],
                "referencedBy": [],
                "optionsList": null,
                "maxTextLength": null,
                "database": "database1",
                "archetype": "int(11)",
                "schema": {
                    "$database": "database1",
                    "$table": "role_and_privilege",
                    "$column": "id",
                    "$columnType": "int(11)",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "auto_increment",
                    "$ordinalColumnPosition": 1,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 1,
                    "$boundConstraint": "PRIMARY",
                    "$referencedTable": null,
                    "$referencedColumn": null
                }
            },
            "id_role": {
                "order": 2,
                "model": "RoleAndPrivilege",
                "table": "role_and_privilege",
                "column": "id_role",
                "type": "number",
                "typeTerm": "int",
                "subtype": "int",
                "default": null,
                "extra": false,
                "isPrimaryKey": false,
                "isAutoIncrement": null,
                "isNullable": false,
                "isFloat": true,
                "isUnsigned": false,
                "isForeignKey": true,
                "isUnique": false,
                "referencesTo": [
                    {
                        "id": "role_and_privilege_ibfk_1",
                        "model": "Role",
                        "table": "role",
                        "column": "id",
                        "isPrimaryKey": false
                    }
                ],
                "referencedBy": [],
                "optionsList": null,
                "maxTextLength": null,
                "database": "database1",
                "archetype": "int(11)",
                "schema": {
                    "$database": "database1",
                    "$table": "role_and_privilege",
                    "$column": "id_role",
                    "$columnType": "int(11)",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 2,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": "role_and_privilege_ibfk_1",
                    "$referencedTable": "role",
                    "$referencedColumn": "id"
                }
            },
            "id_privilege": {
                "order": 3,
                "model": "RoleAndPrivilege",
                "table": "role_and_privilege",
                "column": "id_privilege",
                "type": "number",
                "typeTerm": "int",
                "subtype": "int",
                "default": null,
                "extra": false,
                "isPrimaryKey": false,
                "isAutoIncrement": null,
                "isNullable": false,
                "isFloat": true,
                "isUnsigned": false,
                "isForeignKey": true,
                "isUnique": false,
                "referencesTo": [
                    {
                        "id": "role_and_privilege_ibfk_2",
                        "model": "Privilege",
                        "table": "privilege",
                        "column": "id",
                        "isPrimaryKey": false
                    }
                ],
                "referencedBy": [],
                "optionsList": null,
                "maxTextLength": null,
                "database": "database1",
                "archetype": "int(11)",
                "schema": {
                    "$database": "database1",
                    "$table": "role_and_privilege",
                    "$column": "id_privilege",
                    "$columnType": "int(11)",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 3,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": "role_and_privilege_ibfk_2",
                    "$referencedTable": "privilege",
                    "$referencedColumn": "id"
                }
            },
            "created_at": {
                "order": 4,
                "model": "RoleAndPrivilege",
                "table": "role_and_privilege",
                "column": "created_at",
                "type": "date",
                "typeTerm": "timestamp",
                "subtype": "timestamp",
                "default": "CURRENT_TIMESTAMP",
                "extra": false,
                "isPrimaryKey": false,
                "isAutoIncrement": null,
                "isNullable": false,
                "isFloat": null,
                "isUnsigned": null,
                "isForeignKey": false,
                "isUnique": false,
                "referencesTo": [],
                "referencedBy": [],
                "optionsList": null,
                "maxTextLength": null,
                "database": "database1",
                "archetype": "timestamp",
                "schema": {
                    "$database": "database1",
                    "$table": "role_and_privilege",
                    "$column": "created_at",
                    "$columnType": "timestamp",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": "CURRENT_TIMESTAMP",
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 4,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": null,
                    "$referencedTable": null,
                    "$referencedColumn": null
                }
            },
            "updated_at": {
                "order": 5,
                "model": "RoleAndPrivilege",
                "table": "role_and_privilege",
                "column": "updated_at",
                "type": "date",
                "typeTerm": "datetime",
                "subtype": "datetime",
                "default": "CURRENT_TIMESTAMP",
                "extra": "on update CURRENT_TIMESTAMP",
                "isPrimaryKey": false,
                "isAutoIncrement": null,
                "isNullable": false,
                "isFloat": null,
                "isUnsigned": null,
                "isForeignKey": false,
                "isUnique": false,
                "referencesTo": [],
                "referencedBy": [],
                "optionsList": null,
                "maxTextLength": null,
                "database": "database1",
                "archetype": "datetime",
                "schema": {
                    "$database": "database1",
                    "$table": "role_and_privilege",
                    "$column": "updated_at",
                    "$columnType": "datetime",
                    "$isColumnNullable": "YES",
                    "$defaultColumnValue": "CURRENT_TIMESTAMP",
                    "$extraColumnInformation": "on update CURRENT_TIMESTAMP",
                    "$ordinalColumnPosition": 5,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": null,
                    "$referencedTable": null,
                    "$referencedColumn": null
                }
            }
        }
	}

}

module.exports = RoleAndPrivilege;