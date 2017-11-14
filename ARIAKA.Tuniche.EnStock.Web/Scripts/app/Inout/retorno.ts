/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Inout {
	'use strict';
	export class InoutRetornoViewModel {

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
		idAuth = [{ "name": "Jorge Escudero" }, { "name": "IVAN CAlle" }];
		campAsig = [{ "name": "Dato Ejemplo 1" }, { "name": "Dato ejemplo 2" }];
		articulos = [{ "name": "Azadilla" }, { "name": "Alicate Universal" }];


		formOptions: any = {
			formData: this.employees,
			labelLocation: "top",
			items: [{
				itemType: "group",
				colCount: 3,
				items: ["FECHA","Num_Doc"]
			}, {
				itemType: "group",
				colCount: 3,
				items: [{
					dataField: "ARTICULOS",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'name',
						dataSource: new DevExpress.data.DataSource({
							store: this.articulos
						})
					}
				}, {
					dataField: "CANTIDAD",
					editorType: "dxTextBox",
					editorOptions: {
						width: 200
					}
				}]
			}, {
				itemType: "group",
				colCount: 2,
				items: [{
					dataField: "ID_Autorizado",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'name',
						dataSource: new DevExpress.data.DataSource({
							store: this.idAuth
						})
					}
				}]
			}, {
				itemType: "group",
				colCount: 3,
				items: [{
					editorType: "dxButton",
					editorOptions: {
						text: "Agregar",
						type: "success",
						onClick: function () {
							DevExpress.ui.notify("Salida Registrada", "success", 2000);
						}
					}
				}, {
					editorType: "dxButton",
					editorOptions: {
						text: "Cancelar",
						type: "danger",
						onClick: function () {
							DevExpress.ui.notify("Salida Registrada", "success", 2000);
						}
					}
					}, {
						editorType: "dxButton",
						editorOptions: {
							text: "Limpiar",
							type: "default",
							onClick: function () {
								DevExpress.ui.notify("Salida Registrada", "success", 2000);
							}
						}
					}]
			}]
		};

		dataGridOptions: any = {
			dataSource: this.employees,
			columns: ['FECHA', 'NUMERO', 'CODIGO', 'DESCRIP', 'GUIA', 'BODEGA', 'CANTIDAD', 'PROVEEDOR', 'PRECIO_UNI', 'PRECIO_TO']
		}
	}
}