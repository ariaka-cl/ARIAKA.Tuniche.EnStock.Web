Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("proveedores")>
    Public Class ProveedorController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace