Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("historial")>
    Public Class HistorialController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function
    End Class
End Namespace