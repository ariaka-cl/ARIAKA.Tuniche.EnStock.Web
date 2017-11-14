/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Inout {
	'use strict';
	export class InoutStockViewModel {

		employees = {
			"FECHA": new Date(2017, 2, 16),
			"Tipo_Documento": "Guia",
			"Num_Doc": "188998",
			"BODEGA": "LAS PALMAS",
			"CANTIDAD": "1",
			"EMBASE": "",
			"PRECIOUNIT": "$2.000",
			"DESC": "",
			"PRECIO_UNI": "1.000",
			"PRECIO_TOT": "6000"
		};
	
		articulos = [{ "name": "Azadilla" }, { "name": "Alicate Universal" }];
		
		formOptions: any = {
			formData: this.employees,
			labelLocation: "top",
			items: [{
				itemType: "group",
				colCount: 3,
				items: ["Codigo",{					
					editorType: "dxButton",
					editorOptions: {
						text: "Buscar",
						type: "success",
						icon: "search",
						onClick: function () {
							DevExpress.ui.notify("Buscar Producto", "success", 2000);
						}
					}
				}]
			}, {
					itemType: "group",
					colCount: 2,
				items: [{
					dataField: "Descripcion",
					editorType: "dxTextBox",
					editorOptions: {
						
					}
				}]
			}, {
				itemType: "group",
				colCount: 3,
				items: ["CANTIDAD","BODEGA"]
			}, {
				itemType: "group",
				colCount: 3,
				items: ["CANTIDAD", "BODEGA"]
			}]
		};		
	}
}