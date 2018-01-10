Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("bodegas")>
    Public Class BodegasController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace