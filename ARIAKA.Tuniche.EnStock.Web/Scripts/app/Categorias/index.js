/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
var Categorias;
(function (Categorias) {
    'use strict';
    var CategoriasIndexViewModel = (function () {
        function CategoriasIndexViewModel() {
            this.cate = [{ "name": "Herramientas" }, { "name": "Agroquimicos" }];
            this.categorias = { "Nombre": "" };
            this.dataGridOptions = {
                dataSource: new DevExpress.data.DataSource({
                    store: this.cate
                })
            };
            this.formOptions = {
                formData: this.categorias,
                labelLocation: "top",
                items: [{
                        dataField: "Nombre",
                        editorType: "dxTextBox",
                        editorOptions: {
                            width: 200
                        }
                    }]
            };
            this.buttonOptionsAdd = {
                text: "Agregar",
                icon: "plus"
            };
            this.buttonOptionsEdit = {
                text: "Editar",
                icon: "edit",
                disabled: true
            };
            this.buttonOptionsDelete = {
                text: "Borrar",
                icon: "remove",
                disabled: true
            };
            this.textBoxOptions = {
                width: 200,
                label: "Nombre"
            };
        }
        return CategoriasIndexViewModel;
    }());
    Categorias.CategoriasIndexViewModel = CategoriasIndexViewModel;
})(Categorias || (Categorias = {}));
//# sourceMappingURL=index.js.map