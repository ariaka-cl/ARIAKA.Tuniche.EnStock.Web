@Code
    ViewData("Title") = "Index"
End Code

<div class="container-fluid">
    <h3>Ultima Modificacion: <span data-bind="text: nombreUsuario"></span>, <span data-bind="text: accion"></span>, <span data-bind="text: fecha"></span>
</div>


    <div class="long-title"><h3>Ingresos</h3></div>
    <div id="form-container">
        <div id="form-in" data-bind="dxForm: formOptions"></div>
    </div>
    <br />
    <br />
    <div class="btn-group" role="group">
        <div data-bind="dxButton: buttonOptionsAdd"></div>       
        <div data-bind="dxButton: buttonOptionsDelete"></div>
    </div>
<br />
<br />
    <div id="grid-in" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/index.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutIndexViewModel())
    </script>
End Section


