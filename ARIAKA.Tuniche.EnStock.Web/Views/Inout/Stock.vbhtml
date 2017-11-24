@Code
    ViewData("Title") = "Stock"
End Code


<div class="long-title"><h3>Stock Online</h3></div>
<div class="row">
    <div id="form-container">
        <div id="form-stock" data-bind="dxForm: formOptions"></div>
    </div>
</div>


    @Section scripts
        <script type="text/javascript" src="~/Scripts/app/Inout/stock.js"></script>
        <script>
            ko.applyBindings(new Inout.InoutStockViewModel())
        </script>
    End Section
