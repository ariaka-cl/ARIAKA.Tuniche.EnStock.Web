Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/bodegas")>
    Public Class BoegasAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetBodegas")>
        Public Function GetBodegas() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listBodegas As List(Of Bodega) = db.Bodegaeos.ToList()
                If listBodegas Is Nothing OrElse listBodegas.Count = 0 Then Return Me.Ok(New List(Of Models.BodegaDTO))

                Dim listBodegaDto As New List(Of Models.BodegaDTO)
                For Each bode As Bodega In listBodegas
                    listBodegaDto.Add(New Models.BodegaDTO With {.ID = bode.ID,
                                                                 .Nombre = bode.Nombre})
                Next
                Return Me.Ok(listBodegaDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="SaveBodega")>
        Public Function SaveBodega(<FromBody> model As Models.BodegaDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New bdTunicheContext
            Try
                If model.ID <> 0 Then
                    Dim bodegaExist As Data.Model.Bodega = db.Bodegaeos.Where(Function(b) b.ID = model.ID).SingleOrDefault()
                    With bodegaExist
                        .Nombre = model.Nombre
                    End With
                    db.SaveChanges()
                    Return Me.Ok(model)
                End If

                Dim bodega As New Bodega With {.Nombre = model.Nombre}
                db.Bodegaeos.Add(bodega)
                db.SaveChanges()
                model.ID = bodega.ID
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpDelete>
        <Route("{id}", Name:="DeleteBodega")>
        Public Function DeleteBodega(id As Integer) As IHttpActionResult
            If id = 0 Then
                Return Me.Content(HttpStatusCode.NotFound, "Bodega No Encontrada")
            End If

            Dim db As New bdTunicheContext
            Try
                Dim bodega As Bodega = db.Bodegaeos.Where(Function(b) b.ID = id).SingleOrDefault()
                Dim stockProduc As List(Of StockProductos) = db.StockProductos.Where(Function(b) b.Bodega.ID = bodega.ID).ToList()
                If stockProduc IsNot Nothing AndAlso stockProduc.Count > 0 Then
                    Return Me.Content(HttpStatusCode.BadRequest, "Bodega no se puede eliminar porque tiene artículos")
                End If

                db.Bodegaeos.Remove(bodega)
                db.SaveChanges()
                Return Me.Content(HttpStatusCode.OK, String.Format("Bodega Eliminada {0}", id))
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace