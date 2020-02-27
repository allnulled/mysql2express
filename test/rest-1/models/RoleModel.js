const Model = require(__dirname + "/Model.js");

class Role extends Model {

	static get MODEL_INFO() {
		return {
            "database": "database1",
            "model": "Role",
            "table": "role",
            "attributes": [
                "id",
                "name",
                "description",
                "created_at",
                "updated_at"
            ],
            "primaryKeys": [
                "id"
            ],
            "foreignKeys": []
        };
	}

	static get MODEL_ATTRIBUTES() {
		return {
            "id": {
                "order": 1,
                "model": "Role",
                "table": "role",
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
                "referencedBy": [
                    {
                        "model": "RoleAndPrivilege",
                        "table": "role_and_privilege",
                        "column": "id_role",
                        "isPrimaryKey": false
                    },
                    {
                        "model": "UserAndRole",
                        "table": "user_and_role",
                        "column": "id_role",
                        "isPrimaryKey": false
                    }
                ],
                "optionsList": null,
                "maxTextLength": null,
                "database": "database1",
                "archetype": "int(11)",
                "schema": {
                    "$database": "database1",
                    "$table": "role",
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
            "name": {
                "order": 2,
                "model": "Role",
                "table": "role",
                "column": "name",
                "type": "text",
                "typeTerm": "varchar",
                "subtype": "varchar",
                "default": null,
                "extra": false,
                "isPrimaryKey": false,
                "isAutoIncrement": null,
                "isNullable": false,
                "isFloat": null,
                "isUnsigned": null,
                "isForeignKey": false,
                "isUnique": true,
                "referencesTo": [],
                "referencedBy": [],
                "optionsList": null,
                "maxTextLength": 64,
                "database": "database1",
                "archetype": "varchar(64)",
                "schema": {
                    "$database": "database1",
                    "$table": "role",
                    "$column": "name",
                    "$columnType": "varchar(64)",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 2,
                    "$maximumCharactersLength": 64,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": "name",
                    "$referencedTable": null,
                    "$referencedColumn": null
                }
            },
            "description": {
                "order": 3,
                "model": "Role",
                "table": "role",
                "column": "description",
                "type": "text",
                "typeTerm": "varchar",
                "subtype": "varchar",
                "default": null,
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
                "maxTextLength": 510,
                "database": "database1",
                "archetype": "varchar(510)",
                "schema": {
                    "$database": "database1",
                    "$table": "role",
                    "$column": "description",
                    "$columnType": "varchar(510)",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 3,
                    "$maximumCharactersLength": 510,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": null,
                    "$referencedTable": null,
                    "$referencedColumn": null
                }
            },
            "created_at": {
                "order": 4,
                "model": "Role",
                "table": "role",
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
                    "$table": "role",
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
                "model": "Role",
                "table": "role",
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
                    "$table": "role",
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

module.exports = Role;