Imports System.Net
Imports System.Web.Http

Namespace Controllers.API
    <RoutePrefix("api/usuarios")>
    Public Class UsuariosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetUsuarios")>
        Public Function GetUsuarios() As IHttpActionResult
            Return Me.Ok(Usuarios)
        End Function

        Public Function Usuarios() As List(Of Models.UsuariosDTO)
            Dim listUser As New List(Of Models.UsuariosDTO)
            listUser.Add(New Models.UsuariosDTO With {.Nombre = "juan", .NickName = "jbarriga", .Run = "1122222"})
            Return listUser
        End Function
    End Class
End Namespace