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

        <HttpPost>
        <Route("", Name:="SaveUsuarios")>
        Public Function SaveUsuarios(<FromBody> model As Models.UsuariosDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If
            'TODO: Mapeo a base de datos
            Return Me.Ok(Usuarios)
        End Function

        <HttpDelete>
        <Route("{id}", Name:="DeleteUser")>
        Public Function DeleteUser(id As Integer) As IHttpActionResult
            If id <> 0 Then
                Return Me.Content(HttpStatusCode.OK, String.Format("Usuario Eliminado {0}", id))
            End If
            'TODO: Mapeo a base de datos
            Return Me.Ok(Usuarios)
        End Function

        Public Function Usuarios() As List(Of Models.UsuariosDTO)
            Dim listUser As New List(Of Models.UsuariosDTO)
            listUser.Add(New Models.UsuariosDTO With {.ID = 1, .Nombre = "juan", .NickName = "jbarriga", .Run = "1122222"})
            listUser.Add(New Models.UsuariosDTO With {.ID = 2, .Nombre = "pablo", .NickName = "pmarmol", .Run = "1133333"})
            Return listUser
        End Function
    End Class
End Namespace