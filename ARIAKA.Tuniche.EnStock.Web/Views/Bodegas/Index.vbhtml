@Code
    ViewData("Title") = "Mantenedor Bodegas"
End Code

<div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="long-title"><h3>Editar Bodegas</h3></div>
        <br />
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
        <div id="grid-bodegas" data-bind="dxDataGrid: dataGridOptions"></div>
    </div>
</div>
@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Bodegas/Index.js"></script>
    <script>
        ko.applyBindings(new Bodegas.BodegasIndexViewModel());
    </script>
End Section




