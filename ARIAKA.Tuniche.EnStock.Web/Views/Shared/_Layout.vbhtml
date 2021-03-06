﻿<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title -  EnStock</title>
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")
</head>
<body>
    <div class="container-fluid">
        <div class="row navbar-fixed-top">            
            <div class="col-sm-3 col-lg-4 col-md-3">
                <div class="nav-side-menu ">
                    <div class="brand"><a href="@Url.Action("Index", "Home")">TUNICHE</a></div>
                    <i class="glyphicon glyphicon-menu-hamburger toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                    <div class="menu-list">

                        <ul id="menu-content" class="menu-content collapse out">
                            
                            <!-- ko if: bodeguero -->
                                <li data-toggle="collapse" data-target="#ingreso">
                                    <a href="@Url.Action("Index", "Inout")"><i class="glyphicon glyphicon glyphicon-resize-small fa-lg"></i> Ver Ingresos</a>
                                </li>
                           
                                <li data-toggle="collapse" id="salida" data-target="#salida">
                                    <a href="@Url.Action("Salidas", "Inout")"><i class="glyphicon glyphicon glyphicon-resize-full fa-lg"></i> Ver Salidas </a>
                                </li>
                                <li data-toggle="collapse" data-target="#traslados">
                                    <a href="@Url.Action("Traspaso", "Inout")"><i class="glyphicon glyphicon glyphicon-retweet fa-lg"></i> Traslados </a>
                                </li>
                                <li data-toggle="collapse" data-target="#retorno">
                                    <a href="@Url.Action("Retorno", "Inout")"><i class="glyphicon glyphicon glyphicon-download-alt fa-lg"></i> Retorno Herramientas </a>
                                </li>
                            <!-- /ko -->

                                <li data-toggle="collapse" data-target="#stock">
                                    <a href="@Url.Action("Stock", "Inout")"><i class="glyphicon glyphicon glyphicon-eye-open fa-lg"></i> Stock Online </a>
                                </li>
                                <li data-toggle="collapse" data-target="#stock">
                                    <a href="@Url.Action("Localidad", "Productos")"><i class="glyphicon glyphicon glyphicon-globe fa-lg"></i> Stock Localidad </a>
                                </li>
                              
                                <li data-toggle="collapse" data-target="#productos">
                                    <a href="@Url.Action("Index", "Productos")"><i class="glyphicon glyphicon glyphicon glyphicon-folder-close fa-lg"></i>Ver Insumos </a>
                                </li>
                            <!-- ko if: administrador -->
                                <li data-toggle="collapse" data-target="#proveedor">
                                    <a href="@Url.Action("Index", "Proveedor")"><i class="glyphicon glyphicon glyphicon glyphicon-list-alt fa-lg"></i> Proveedores </a>
                                </li>
                                <li data-toggle="collapse" data-target="#insumos">
                                    <a href="@Url.Action("Add", "Productos")"><i class="glyphicon glyphicon glyphicon glyphicon-qrcode fa-lg"></i> Insumos </a>
                                </li>
                                <li data-toggle="collapse" data-target="#categorias">
                                    <a href="@Url.Action("Index", "Categorias")"><i class="glyphicon glyphicon glyphicon glyphicon-tags fa-lg"></i> Categorias </a>
                                </li>
                                <li data-toggle="collapse" data-target="#usuarios">
                                    <a href="@Url.Action("Index", "Usuarios")"><i class="glyphicon glyphicon glyphicon glyphicon-user fa-lg"></i> Usuarios </a>
                                </li>
                            <!-- /ko -->
                                <li data-toggle="collapse" data-target="#logout">
                                    <a href="javascript:logout();"><i class="glyphicon glyphicon glyphicon glyphicon-log-out fa-lg"></i> Cerrar Sesion </a>
                                </li>
</ul>
                    </div>                    
                </div>
            </div>
            <div class="col-sm-9 col-lg-8 col-md-9 left">
                
                @RenderBody()
                                   
                <hr />
                <footer>
                    <p>&copy; @DateTime.Now.Year - TUNICHE EnStock - Desarrollado por Ariaka</p>
                </footer>
            </div>            
        </div>        
    </div>    
    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/knockout")
    @Scripts.Render("~/bundles/devextreme")
    @Scripts.Render("~/bundles/bootstrap")
    <script>

        function logout() {
            localStorage.clear();
            window.location.replace(window.location.origin + '/Login');
        }
        
        var role = localStorage.getItem('rol');
        if (role === null || role === undefined) {
            window.location.replace(window.location.origin + '/Login');
        }

    </script>
    @RenderSection("scripts", required:=False)
</body>
</html>
