@Code
    ViewData("Title") = "Index"
End Code


    <div class="long-title"><h3>Ingresos</h3></div>
    <div id="form-container">
        <div data-bind="dxForm: formOptions"></div>
    </div>
    <br />
    <br />
    <div data-bind="dxDataGrid: dataGridOptions"></div>


@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/index.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutIndexViewModel())
    </script>
End Section


