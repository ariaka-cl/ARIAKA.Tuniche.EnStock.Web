@Code
    ViewData("Title") = "Index"
End Code

<div class="long-title"><h3>Insumos</h3></div>
<div class="row">
    <div id="tabs">        
        <div data-bind="dxTabs: tabOptions"></div>
        <div class="content  dx-fieldset">
            <div class="dx-field">
                <div id="grid-produ" data-bind="dxDataGrid: dataGridOptions"></div>
                @*<div class="dx-field-label">Selected index:</div>
                <div class="dx-field-value">
                    <div data-bind="dxSelectBox: selectBoxOptions">
                    </div>
                </div>*@
            </div>            
        </div>
    </div>
</div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Productos/Index.js"></script>
    <script>
        ko.applyBindings(new Productos.ProductosIndexViewModel());
    </script>
End Section
