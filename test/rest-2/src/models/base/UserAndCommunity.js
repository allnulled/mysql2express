const Model = require(__dirname + "/Model.js");

class UserAndCommunityBase extends Model {

	static get MODEL_INFO() {
		return {
            "database": "database1",
            "model": "UserAndCommunity",
            "table": "user_and_community",
            "attributes": [
                "id",
                "id_user",
                "id_community",
                "created_at",
                "updated_at"
            ],
            "primaryKeys": [
                "id"
            ],
            "foreignKeys": [
                {
                    "constraint": "user_and_community_ibfk_1",
                    "column": "id_user",
                    "referencedTable": "user",
                    "referencedColumn": "id"
                },
                {
                    "constraint": "user_and_community_ibfk_2",
                    "column": "id_community",
                    "referencedTable": "community",
                    "referencedColumn": "id"
                }
            ]
        };
	}

	static get MODEL_ATTRIBUTES() {
		return {
            "id": {
                "order": 1,
                "model": "UserAndCommunity",
                "table": "user_and_community",
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
                    "$table": "user_and_community",
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
            "id_user": {
                "order": 2,
                "model": "UserAndCommunity",
                "table": "user_and_community",
                "column": "id_user",
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
                        "id": "user_and_community_ibfk_1",
                        "model": "User",
                        "table": "user",
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
                    "$table": "user_and_community",
                    "$column": "id_user",
                    "$columnType": "int(11)",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 2,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": "user_and_community_ibfk_1",
                    "$referencedTable": "user",
                    "$referencedColumn": "id"
                }
            },
            "id_community": {
                "order": 3,
                "model": "UserAndCommunity",
                "table": "user_and_community",
                "column": "id_community",
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
                        "id": "user_and_community_ibfk_2",
                        "model": "Community",
                        "table": "community",
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
                    "$table": "user_and_community",
                    "$column": "id_community",
                    "$columnType": "int(11)",
                    "$isColumnNullable": "NO",
                    "$defaultColumnValue": null,
                    "$extraColumnInformation": "",
                    "$ordinalColumnPosition": 3,
                    "$maximumCharactersLength": null,
                    "$isUnsigned": 0,
                    "$isAutoIncrement": 0,
                    "$boundConstraint": "user_and_community_ibfk_2",
                    "$referencedTable": "community",
                    "$referencedColumn": "id"
                }
            },
            "created_at": {
                "order": 4,
                "model": "UserAndCommunity",
                "table": "user_and_community",
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
                    "$table": "user_and_community",
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
                "model": "UserAndCommunity",
                "table": "user_and_community",
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
                    "$table": "user_and_community",
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

module.exports = UserAndCommunityBase;