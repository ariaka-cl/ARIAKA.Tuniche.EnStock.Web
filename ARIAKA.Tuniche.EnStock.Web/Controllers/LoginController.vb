Imports System.Web.Mvc

Namespace Controllers
    <RoutePrefix("login")>
    Public Class LoginController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult

            Return View("Index", "_LoginPartial")
        End Function
    End Class
End Namespace