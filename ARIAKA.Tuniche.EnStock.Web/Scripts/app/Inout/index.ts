/// <reference path="../../typings/jquery/jquery.d.ts" />
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
            "PROVEEDOR": "SEÑORES AGRO ARICA SA",
            "CANTIDAD": "1",
            "EMBASE": "",          
            "PRECIOUNIT": "$2.000",
            "DESC": "",
            "PRECIO_UNI": "1.000",            
            "PRECIO_TOT": "6000"
        };

        formOptions: any = {
            formData: this.employees,
            //colCount: 3,
            items: [{
                itemType: "group",
                colCount: 4,
                items: ["FECHA", "Tipo_Documento", "Num_Doc", "BODEGA"]
            }, {
                dataField: "PROVEEDOR",
                editorOptions: {
                    disabled: true
                }
            }, {}, {
                itemType: "group",
                colCount: 4,
                items: ["CANTIDAD", "EMBASE", "PRECIOUNIT", "DESC"]
            }]
        };

        dataGridOptions: any = {
            dataSource: this.employees,
            columns: ['FECHA', 'NUMERO','CODIGO','DESCRIP','GUIA', 'BODEGA', 'CANTIDAD', 'PROVEEDOR','PRECIO_UNI','PRECIO_TO']
        }
    }
}