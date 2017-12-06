@Code
    ViewData("Title") = "Proveedor"
End Code

<div class="long-title"><h3>Agregar Proveedor</h3></div>
<div class="row">
    <label for="nombre">Nombre</label>
    <div id="text-nombre" data-bind="dxTextBox: textBoxOptions"></div>
    <br />
    <div class="btn-group" role="group">
        <div data-bind="dxButton: buttonOptionsAdd"></div>
        <div data-bind="dxButton: buttonOptionsDelete"></div>
    </div>
</div>
<br />
<br />

<div id="grid-proveedor" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Proveedor/index.js"></script>
    <script>
        ko.applyBindings(new Proveedor.ProveedorIndexViewModel());
    </script>
End Section
