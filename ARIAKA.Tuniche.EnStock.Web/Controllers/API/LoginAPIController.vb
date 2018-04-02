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
                    .ID = user.ID
                End With

                Dim historial As New HistoricoModificaciones With {.FechaAccion = Date.Now(),
                                                                   .Accion = "Login",
                                                                   .Usuario = db.Usuarieos.Where(Function(u) u.ID = model.ID).SingleOrDefault()
                }

                db.HistoricoModificacioneos.Add(historial)
                db.SaveChanges()

                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpGet>
        <Route("", Name:="GetUltimaActualizacion")>
        Public Function GetUltimaActualizacion() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim lastUpdate As HistoricoModificaciones = db.HistoricoModificacioneos.OrderByDescending(Function(l) l.ID).Take(1).SingleOrDefault()
                If lastUpdate.ID = 0 Then Return Me.Content(HttpStatusCode.NotFound, "No se encontro registro")
                Dim user As Usuario = db.Usuarieos.Where(Function(u) u.ID = lastUpdate.Usuario.ID).SingleOrDefault()
                Dim historicoDTO As New Models.HistoricoModificacionesDTO With {.Accion = lastUpdate.Accion,
                                                                                .Usuario = New Models.UsuariosDTO With {.Nombre = user.Nombre},
                                                                                .FechaAccion = lastUpdate.FechaAccion
                                                                                }
                Return Me.Ok(historicoDTO)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace