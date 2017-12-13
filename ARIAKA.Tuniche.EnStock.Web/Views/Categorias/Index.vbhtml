@Code
    ViewData("Title") = "Index"
End Code
<div class="row">
<div class="col-lg-6 col-md-6 col-sm-12">
    <div class="long-title"><h3>Categorias</h3></div>
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

    <div id="grid-cate" data-bind="dxDataGrid: dataGridOptions"></div>
</div>
<div class="col-lg-6 col-md-6 col-sm-12">
    <div class="long-title"><h3>Sub Categorias</h3></div>
    <div class="row">       
        <div id="form-sub-cate" data-bind="dxForm: formOptions"></div>
        <br />
        <div class="btn-group" role="group">
            <div data-bind="dxButton: buttonOptionsAddSub"></div>
            <div data-bind="dxButton: buttonOptionsDeleteSub"></div>
        </div>
    </div>
    <br />
    <br />

    <div id="grid-sub-cate" data-bind="dxDataGrid: dataGridOptionsSubCate"></div>
</div>
</div>
@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Categorias/Index.js"></script>
    <script>
        ko.applyBindings(new Categorias.CategoriasIndexViewModel());
    </script>
End Section




