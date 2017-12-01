Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/proveedores")>
    Public Class ProveedorAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetProveedores")>
        Public Function GetProveedores() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listProveedor As List(Of Proveedor) = db.Proveedoreos.ToList()
                If listProveedor Is Nothing OrElse listProveedor.Count = 0 Then Return Me.Ok(New List(Of Models.ProveedorDTO))

                Dim listProveedorDto As New List(Of Models.ProveedorDTO)
                For Each cate As Proveedor In listProveedor
                    listProveedorDto.Add(New Models.ProveedorDTO With {.ID = cate.ID,
                                                                 .Nombre = cate.Nombre})
                Next
                Return Me.Ok(listProveedorDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function


        <HttpPost>
        <Route("", Name:="SaveProveedor")>
        Public Function SaveProveedor(<FromBody> model As Models.ProveedorDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New bdTunicheContext
            Try
                If model.ID <> 0 Then
                    Dim proveedorExist As Data.Model.Proveedor = db.Proveedoreos.Where(Function(u) u.ID = model.ID).SingleOrDefault()
                    With proveedorExist
                        .Nombre = model.Nombre
                    End With
                    db.SaveChanges()
                    Return Me.Ok(model)
                End If

                Dim proveedor As New Proveedor With {.Nombre = model.Nombre}
                db.Proveedoreos.Add(proveedor)
                db.SaveChanges()
                model.ID = proveedor.ID
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpDelete>
        <Route("{id}", Name:="DeleteProveedor")>
        Public Function DeleteProveedor(id As Integer) As IHttpActionResult
            If id = 0 Then
                Return Me.Content(HttpStatusCode.NotFound, "Proveedor No Encontrada")
            End If

            Dim db As New bdTunicheContext
            Try
                Dim proveedor As Proveedor = db.Proveedoreos.Where(Function(u) u.ID = id).SingleOrDefault()
                db.Proveedoreos.Remove(proveedor)
                db.SaveChanges()
                Return Me.Content(HttpStatusCode.OK, String.Format("Proveedor Eliminada {0}", id))
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace