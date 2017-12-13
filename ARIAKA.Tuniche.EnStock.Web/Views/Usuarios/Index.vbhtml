@Code
    ViewData("Title") = "Index"
End Code

<div class="long-title"><h3>Usuarios</h3></div>
<div id="form-container">
    <div id="form-user" data-bind="dxForm: formOptions"></div>
</div>
<br />
<br />
<div class="btn-group" role="group">
    <div data-bind="dxButton: buttonOptionsAdd"></div>   
    <div data-bind="dxButton: buttonOptionsDelete"></div>    
</div>
<br />
<br />
<div id="grid-user" data-bind="dxDataGrid: dataGridOptions"></div>


@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Usuarios/index.js"></script>
    <script>
        ko.applyBindings(new Usuarios.UsuariosIndexViewModel())
    </script>
End Section


