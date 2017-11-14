
Imports System.Web.Http

Namespace Controllers
    <RoutePrefix("")>
    Public Class HomeController
        Inherits System.Web.Mvc.Controller

        <Route("")>
        Function Index() As ActionResult
            ViewData("Message") = "Your application description page."
            Return View()
        End Function

        Function About() As ActionResult
            ViewData("Message") = "Your application description page."

            Return View()
        End Function

        Function Contact() As ActionResult
            ViewData("Message") = "Your contact page."

            Return View()
        End Function
    End Class
End Namespace