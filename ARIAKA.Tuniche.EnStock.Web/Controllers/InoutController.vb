Imports System.Web.Mvc
Namespace Controllers
    <RoutePrefix("inout")>
    Public Class InoutController
        Inherits Controller

        <Route("")>
        Function Index() As ActionResult
            Return View()
        End Function

        <Route("salidas")>
        Function Salidas() As ActionResult
            Return View()
        End Function

        <Route("stock")>
        Function Stock() As ActionResult
            Return View()
        End Function

        <Route("retorno")>
        Function Retorno() As ActionResult
            Return View()
        End Function

        <Route("traspaso")>
        Function Traspaso() As ActionResult
            Return View()
        End Function
    End Class
End Namespace
