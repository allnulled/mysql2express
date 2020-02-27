const Model = require(__dirname + "/Model.js");

class ZExampleOfAll extends Model {

	static get MODEL_INFO() {
		return {
            "database": "database1",
            "model": "ZExampleOfAll",
            "table": "z_example_of_all",
            "attributes": [
                "enum_sample",
                "fuck"
            ],
            "primaryKeys": [],
            "foreignKeys": []
        };
	}

	static get MODEL_ATTRIBUTES() {
		return {
            "enum_sample": {
                "order": 1,
                "model": "ZExampleOfAll",
                "table": "z_example_of_all",
                "column": "enum_sample",
                "type": "list",
                "typeTerm": "enum",
                "subtype": "enum",
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
                "optionsList": [
                    "10000",
                    "2",
                    "3",
                    "4"
                ],
                "maxTextLength": 5,
                "database": "database1",
                "archetype": "enum('10000','2','3','4')",
                "schema": {
                    "$database": "database1",
                    "$table": "z_example_of_all",
                    "$column": "enum_sample",
                    "$columnType": "enum('10000','2','3','4')",
                    "$isColumnNullable": "YES",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 1,
                    "$maximumCharactersLength": 5,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": null,
                    "$referencedTable": null,
                    "$referencedColumn": null
                }
            },
            "fuck": {
                "order": 2,
                "model": "ZExampleOfAll",
                "table": "z_example_of_all",
                "column": "fuck",
                "type": "number",
                "typeTerm": "int",
                "subtype": "int",
                "default": "0",
                "extra": false,
                "isPrimaryKey": false,
                "isAutoIncrement": null,
                "isNullable": false,
                "isFloat": true,
                "isUnsigned": true,
                "isForeignKey": false,
                "isUnique": false,
                "referencesTo": [],
                "referencedBy": [],
                "optionsList": null,
                "maxTextLength": null,
                "database": "database1",
                "archetype": "int(10) unsigned",
                "schema": {
                    "$database": "database1",
                    "$table": "z_example_of_all",
                    "$column": "fuck",
                    "$columnType": "int(10) unsigned",
                    "$isColumnNullable": "YES",
                    "$defaultColumnValue": "0",
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 2,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 1,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": null,
                    "$referencedTable": null,
                    "$referencedColumn": null
                }
            }
        }
	}

}

module.exports = ZExampleOfAll;