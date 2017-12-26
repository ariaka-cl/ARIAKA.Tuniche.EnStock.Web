@Code
    ViewData("Title") = "Home Page"
End Code

<div class="container-fluid">
    <h2>Bienvenido al sistema de control de inventario</h2>
    <div class="login">        
    </div>
</div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Home/index.js"></script>
    <script>
        ko.applyBindings(new Home.HomeIndexViewModel());
    </script>
End Section

