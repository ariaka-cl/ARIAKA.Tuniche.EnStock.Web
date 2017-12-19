Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/usuarios")>
    Public Class UsuariosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetUsuarios")>
        Public Function GetUsuarios() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listUser As List(Of Usuario) = db.Usuarieos.ToList()
                If listUser Is Nothing OrElse listUser.Count = 0 Then Return Me.Ok(New List(Of Models.UsuariosDTO))
                Dim listRol As List(Of Rol) = db.Roleos.ToList()
                Dim listUserDto As New List(Of Models.UsuariosDTO)
                For Each usuario As Usuario In listUser
                    Dim rolDto As New Models.RolDTO With {.ID = usuario.Rol.ID,
                                                          .Nombre = usuario.Rol.Nombre}
                    listUserDto.Add(New Models.UsuariosDTO With {.ID = usuario.ID,
                                                                 .Nombre = usuario.Nombre,
                                                                 .NickName = usuario.NickName,
                                                                 .Password = usuario.Password,
                                                                 .Run = usuario.Run,
                                                                 .Rol = rolDto})
                Next
                Return Me.Ok(listUserDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="SaveUsuarios")>
        Public Function SaveUsuarios(<FromBody> model As Models.UsuariosDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New bdTunicheContext
            Try
                If model.ID <> 0 Then
                    Dim userExist As Usuario = db.Usuarieos.Where(Function(u) u.ID = model.ID).SingleOrDefault()
                    With userExist
                        .Nombre = model.Nombre
                        .NickName = model.NickName
                        .Run = model.Run
                        .Rol = db.Roleos.Where(Function(r) r.ID = model.Rol.ID).SingleOrDefault()
                        .Password = model.Password
                    End With
                    db.SaveChanges()
                    Return Me.Ok(model)
                End If

                Dim rol As Rol = db.Roleos.Where(Function(r) r.ID = model.Rol.ID).SingleOrDefault()
                Dim user As New Usuario With {.Nombre = model.Nombre,
                                            .NickName = model.NickName,
                                            .Password = model.Password,
                                            .Run = model.Run,
                                            .Rol = rol
                }
                db.Usuarieos.Add(user)
                db.SaveChanges()
                model.ID = user.ID
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpDelete>
        <Route("{id}", Name:="DeleteUser")>
        Public Function DeleteUser(id As Integer) As IHttpActionResult
            If id = 0 Then
                Return Me.Content(HttpStatusCode.NotFound, "Usuario No Encontrado")
            End If

            Dim db As New bdTunicheContext
            Try
                Dim user As Usuario = db.Usuarieos.Where(Function(u) u.ID = id).SingleOrDefault()
                db.Usuarieos.Remove(user)
                db.SaveChanges()
                Return Me.Content(HttpStatusCode.OK, String.Format("Usuario Eliminado {0}", id))
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpGet>
        <Route("autorizador", Name:="GetAutorizador")>
        Public Function GetAutorizador() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                'Dim listUser As List(Of Usuario) = db.Usuarieos.Where(Function(u) u.Rol.ID = 4).ToList()
                Dim listUser As List(Of Usuario) = db.Usuarieos.ToList()
                If listUser Is Nothing OrElse listUser.Count = 0 Then Return Me.Ok(New List(Of Models.UsuariosDTO))
                Dim listUserDto As New List(Of Models.UsuariosDTO)
                For Each usuario As Usuario In listUser
                    listUserDto.Add(New Models.UsuariosDTO With {.ID = usuario.ID,
                                                                 .Nombre = usuario.Nombre,
                                                                 .NickName = usuario.NickName,
                                                                 .Password = usuario.Password,
                                                                 .Run = usuario.Run})
                Next
                Return Me.Ok(listUserDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function
    End Class
End Namespace