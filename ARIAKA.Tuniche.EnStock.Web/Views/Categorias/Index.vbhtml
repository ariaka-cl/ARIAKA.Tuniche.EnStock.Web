@Code
    ViewData("Title") = "Index"
End Code

<div class="long-title"><h3>Categorias</h3></div>
<div class="row">    
        <label for="nombre">Nombre</label>
        <div id="nombre" data-bind="dxTextBox: textBoxOptions"></div>            
    <br />     
        <div class="btn-group" role="group">
            <div data-bind="dxButton: buttonOptionsAdd"></div>
            <div data-bind="dxButton: buttonOptionsEdit"></div>
            <div data-bind="dxButton: buttonOptionsDelete"></div>
        </div>     
</div>
<br />
<br />

<div data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Categorias/Index.js"></script>
    <script>
        ko.applyBindings(new Categorias.CategoriasIndexViewModel());
    </script>
End Section




