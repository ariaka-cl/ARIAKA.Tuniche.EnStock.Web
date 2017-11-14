/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Categorias {
    'use strict';
    export class CategoriasIndexViewModel {

		cate = [{ "name": "Herramientas" }, { "name": "Agroquimicos" }];
		categorias = {"Nombre":""};

		dataGridOptions: any = {
			dataSource: new DevExpress.data.DataSource({
				store: this.cate
			})
		}

		formOptions: any = {
			formData: this.categorias,
			labelLocation: "top",
			items: [{					
					dataField: "Nombre",
					editorType: "dxTextBox",
					editorOptions: {
						width: 200						
					}				
			}]
		}

		buttonOptionsAdd: any = {
			text: "Agregar",
			icon: "plus"
		}
		buttonOptionsEdit: any = {
			text: "Editar",
			icon: "edit",
			disabled:true
		}
		buttonOptionsDelete: any = {
			text: "Borrar",
			icon: "remove",
			disabled: true
		}

		textBoxOptions: any = {
			width: 200,
			label:"Nombre"
		}
    }
}