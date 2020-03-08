const Model = require(__dirname + "/Model.js");

class SessionsBase extends Model {

	static get MODEL_INFO() {
		return {
            "database": "database1",
            "model": "Sessions",
            "table": "sessions",
            "attributes": [
                "id",
                "token"
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
                "model": "Sessions",
                "table": "sessions",
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
                    "$table": "sessions",
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
            "token": {
                "order": 2,
                "model": "Sessions",
                "table": "sessions",
                "column": "token",
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
                "maxTextLength": 1024,
                "database": "database1",
                "archetype": "varchar(1024)",
                "schema": {
                    "$database": "database1",
                    "$table": "sessions",
                    "$column": "token",
                    "$columnType": "varchar(1024)",
                    "$isColumnNullable": "YES",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 2,
                    "$maximumCharactersLength": 1024,
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

module.exports = SessionsBase;