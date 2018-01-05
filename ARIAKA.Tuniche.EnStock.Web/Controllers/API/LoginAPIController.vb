Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/login")>
    Public Class LoginAPIController
        Inherits ApiController

        <HttpPost>
        <Route("", Name:="PostLogin")>
        Public Function PostLogin(<FromBody> model As Models.UsuariosDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New bdTunicheContext
            Try
                Dim user As Usuario = db.Usuarieos.Where(Function(u) u.Run = model.Run).Where(Function(u) u.Password = model.Password).SingleOrDefault()
                If user Is Nothing Then Return Me.Content(HttpStatusCode.Unauthorized, "usuario o contraseña inválidos")

                With model
                    .NickName = user.NickName
                    .Nombre = user.Nombre
                    .Rol = New Models.RolDTO With {.ID = user.Rol.ID, .Nombre = user.Rol.Nombre}
                End With

                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace