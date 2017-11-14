﻿/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Inout {
    'use strict';
    export class InoutIndexViewModel {

        employees = {
            "FECHA": new Date(2017, 2, 16),
            "Tipo_Documento": "Guia",
            "Num_Doc": "188998",
            "BODEGA": "LAS PALMAS",           
            "CANTIDAD": "1",
            "ENVASE": "",          
            "PRECIOUNIT": "$2.000",
            "DESC": "",
            "PRECIO_UNI": "1.000",            
            "PRECIO_TOT": "6000"
        };
		proveedor = [{ "name": "SEÑORES AGRO ARICA SA" }, { "name": "COMERCIAL ARICA SA" }];
		articulos = [{ "name": "Azadilla" }, { "name": "Alicate Universal" }];

        formOptions: any = {
			formData: this.employees,
			labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 3,
                items: ["FECHA", {
                    dataField: "Tipo_Documento",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        items: [ "Guia","Factura" ],
                        value: ""
                    }
                }, "Num_Doc"]
			}, {
				itemType: "group",
				colCount: 3,
				items: [{
					dataField: "PROVEEDOR",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'name',
						dataSource: new DevExpress.data.DataSource({
							store: this.proveedor
						})
					}
				}, {
					dataField: "ARTICULOS",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'name',
						dataSource: new DevExpress.data.DataSource({
							store: this.articulos
						})
					}
					}, "BODEGA"]
			},{
                itemType: "group",
                colCount: 3,
                items: ["EMBASE", "PRECIOUNIT", "DESC"]
			}, {
				itemType: "group",
				colCount: 3,
				items: [{
					dataField: "CANTIDAD",
					editorType: "dxTextBox",
					editorOptions: {
						width:200
					}					
				}, {					
					editorType: "dxButton",					
					editorOptions: {
						text: "Agregar",
						type: "success",
					}}]
			}]
        };

        dataGridOptions: any = {
            dataSource: this.employees,
            columns: ['FECHA', 'NUMERO','CODIGO','DESCRIP','GUIA', 'BODEGA', 'CANTIDAD', 'PROVEEDOR','PRECIO_UNI','PRECIO_TO']
        }
    }
}