Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/historial")>
    Public Class HistorialAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetHistorial")>
        Public Function GetHistorial() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim historico As List(Of HistoricoModificaciones) = db.HistoricoModificacioneos.ToList()
                If historico IsNot Nothing AndAlso historico.Count = 0 Then Return Me.Content(HttpStatusCode.NotFound, "No se encontro registro")
                Dim userList As List(Of Usuario) = db.Usuarieos.ToList()

                Dim historicoListDto As New List(Of Models.HistoricoModificacionesDTO)
                For Each historial As HistoricoModificaciones In historico
                    Dim user As Usuario = userList.Where(Function(u) u.ID = historial.Usuario.ID).SingleOrDefault()
                    Dim historialDTO As New Models.HistoricoModificacionesDTO With {.Accion = historial.Accion,
                                                                                .Usuario = New Models.UsuariosDTO With {.Nombre = user.Nombre},
                                                                                .FechaAccion = historial.FechaAccion
                                                                                }
                    historicoListDto.Add(historialDTO)
                Next
                Return Me.Ok(historicoListDto.OrderByDescending(Function(h) h.FechaAccion).ToList())
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="PostHistorial")>
        Public Function GetHistorial(<FromBody> model As Models.HistorialSessionDTO) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                If model Is Nothing OrElse model.UserID = 0 Then Return Me.Content(HttpStatusCode.Found, "No se puede guardar, falta ID usuario.")

                Dim historial As New HistoricoModificaciones With {.FechaAccion = Date.Now(),
                                                                   .Accion = model.Accion,
                                                                   .Usuario = db.Usuarieos.Where(Function(u) u.ID = model.UserID).SingleOrDefault()
                }

                db.HistoricoModificacioneos.Add(historial)
                db.SaveChanges()
                Return Me.Ok()
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace