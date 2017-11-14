/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
var Usuarios;
(function (Usuarios) {
    'use strict';
    var UsuariosIndexViewModel = (function () {
        function UsuariosIndexViewModel() {
            var _this = this;
            this.usuarios = ko.observableArray();
            this.formOptions = {
                formData: this.usuarios,
                labelLocation: "top",
                items: [{
                        itemType: "group",
                        colCount: 3,
                        items: ["Nombre", "Run", "NickName"]
                    }, {
                        itemType: "group",
                        colCount: 3,
                        items: ["Rol", "Password", "Password_verifica"]
                    }]
            };
            this.dataGridOptions = {
                dataSource: this.usuarios,
                columns: ['Nombre', 'Run', 'NickName', 'Rol', 'Password']
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
            $.ajax({
                type: 'GET',
                url: 'api/usuarios',
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var users = {
                            Nombre: data[i].nombre,
                            Run: data[i].run,
                            NickName: data[i].nickName
                        };
                        _this.usuarios.push(users);
                    }
                }
            });
        }
        return UsuariosIndexViewModel;
    }());
    Usuarios.UsuariosIndexViewModel = UsuariosIndexViewModel;
})(Usuarios || (Usuarios = {}));
//# sourceMappingURL=index.js.map