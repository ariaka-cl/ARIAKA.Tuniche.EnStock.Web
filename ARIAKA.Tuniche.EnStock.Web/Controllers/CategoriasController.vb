﻿Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("categorias")>
    Public Class CategoriasController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace