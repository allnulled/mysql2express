# TODO.md

Controlador:
	[ ] Desarrollar y testear métodos CRUD del controlador
		[ ] /GET 		{one}
		[ ] /GET 		{all}
		[ ] /POST 		{one}
		[ ] /POST 		{all}
		[ ] /PUT 		{one}
		[ ] /PUT 		{all}
		[ ] /DELETE 	{one}
		[ ] /DELETE 	{all}
		[ ] /GET 		{file}
	[ ] Añadir estados de activación para:
		[ ] activationPolicy: <"rules deactivate" | "rules activate">
			activationRules: [
				<"get" | "post" | "put" | "delete" | 
				"getOne" | "postOne" | "putOne" | "deleteOne" | 
				"getAll" | "postAll" | "putAll" | "deleteAll" | 
				"getFile">
			]
	[ ] Testear estados de habilitación del controlador.
	

