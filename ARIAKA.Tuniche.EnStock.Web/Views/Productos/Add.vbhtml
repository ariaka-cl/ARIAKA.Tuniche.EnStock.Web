@Code
    ViewData("Title") = "Add"
End Code

<div class="long-title"><h3>Agregar Insumos</h3></div>
<div id="form-container">
    <div id="form-productos" data-bind="dxForm: formOptions"></div>
</div>

<br />
<br />
<div class="btn-group" role="group">
    <div data-bind="dxButton: buttonOptionsAdd"></div>   
    <div data-bind="dxButton: buttonOptionsDelete"></div>
</div>
<br />
<br />

<div id="grid-produ" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Productos/Add.js"></script>
    <script>
        ko.applyBindings(new Productos.ProductosAddViewModel());
    </script>
End Section
