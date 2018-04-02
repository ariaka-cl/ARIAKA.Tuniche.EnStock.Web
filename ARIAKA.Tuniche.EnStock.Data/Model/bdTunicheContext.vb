Imports System
Imports System.Data.Entity
Imports System.Linq

Namespace Model
    Public Class bdTunicheContext
        Inherits DbContext

        Public Property Usuarieos As DbSet(Of Usuario)
        Public Property Roleos As DbSet(Of Rol)
        Public Property Productoes As DbSet(Of Productos)
        Public Property Categoriaeos As DbSet(Of Categorias)
        Public Property Ingresos As DbSet(Of Ingresos)
        Public Property Bodegaeos As DbSet(Of Bodega)
        Public Property Salidaeos As DbSet(Of Salidas)
        Public Property Proveedoreos As DbSet(Of Proveedor)
        Public Property SubCategoriaeos As DbSet(Of SubCategoria)
        Public Property StockProductos As DbSet(Of StockProductos)
        Public Property Retorneos As DbSet(Of Retorno)
        Public Property HistoricoModificacioneos As DbSet(Of HistoricoModificaciones)
        Public Property DetalleIngresoes As DbSet(Of DetalleIngresos)
        Public Property DetalleSalidaoes As DbSet(Of DetalleSalidas)

        Public Sub New()
            MyBase.New("name=bdTunicheContext")
        End Sub

        Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
            MyBase.OnModelCreating(modelBuilder)
        End Sub

        Public Function GetProductosGrl(numBodegas As Integer) As Object
            Dim cmd As New SqlClient.SqlCommand("spGetProductosGral")
            Dim produList As New List(Of Model.ProductosGralResultSet)
            cmd.Connection = Database.Connection
            Try
                cmd.CommandType = CommandType.StoredProcedure
                Dim adapter As New SqlClient.SqlDataAdapter(cmd)

                Dim bodegas As New DataSet
                adapter.Fill(bodegas)

                For Each dr As DataRow In bodegas.Tables(0).Rows
                    Dim listStok As New List(Of String)
                    For i As Integer = 7 To numBodegas + 6
                        Dim stock As String = If(IsDBNull(dr.Item(i)), "0", dr.Item(i))
                        listStok.Add(stock)
                    Next
                    Dim produ As New Model.ProductosGralResultSet With {.Codigo = If(IsDBNull(dr.Item(0)), "", dr.Item(0)),'dr.Item(0).ToString,
                                                                        .CategoriaID = If(IsDBNull(dr.Item(1)), 0, CInt(dr.Item(1))),'CInt(dr.Item(1)),
                                                                        .Nombre = If(IsDBNull(dr.Item(2)), "", dr.Item(2)),'dr.Item(2).ToString(),
                                                                        .StockActual = If(IsDBNull(dr.Item(4)), 0, CInt(dr.Item(4))),'CInt(dr.Item(4)),
                                                                        .StockMinimo = If(IsDBNull(dr.Item(3)), 0, CInt(dr.Item(3))),'CInt(dr.Item(3)),
                                                                        .Unidad = If(IsDBNull(dr.Item(5)), "", dr.Item(5)),'dr.Item(5),
                                                                        .Tipo = If(IsDBNull(dr.Item(6)), "", dr.Item(6)),'dr.Item(6),
                                                                        .Bodegas = listStok}
                    produList.Add(produ)
                Next
            Catch ex As Exception
                Return String.Format("Error SQL: {0}", ex.Message)
            Finally
                cmd.Connection.Close()
            End Try
            Return produList
        End Function

        Public Function GetIngresosDetalle(numBodegas As Integer) As Object
            Dim cmd As New SqlClient.SqlCommand("spGetIngresosDetalle")
            Dim produList As New List(Of Model.IngresosGralResultSet)
            cmd.Connection = Database.Connection
            Try
                cmd.CommandType = CommandType.StoredProcedure
                Dim adapter As New SqlClient.SqlDataAdapter(cmd)

                Dim bodegas As New DataSet
                adapter.Fill(bodegas)
                For Each dr As DataRow In bodegas.Tables(0).Rows
                    Dim listStok As New List(Of String)
                    For i As Integer = 7 To numBodegas + 6
                        Dim stock As String = If(IsDBNull(dr.Item(i)), "0", dr.Item(i))
                        listStok.Add(stock)
                    Next
                    Dim ingre As New Model.IngresosGralResultSet With {.ID = If(IsDBNull(dr.Item(0)), "", dr.Item(0)),
                                                                        .Fecha = If(IsDBNull(dr.Item(1)), Nothing, dr.Item(1)),
                                                                        .Nombre = If(IsDBNull(dr.Item(2)), "", dr.Item(2)),
                                                                        .TipoDocumento = If(IsDBNull(dr.Item(3)), "", dr.Item(3)),
                                                                        .NumeroDocumento = If(IsDBNull(dr.Item(4)), "", dr.Item(4)),
                                                                        .Cantidad = If(IsDBNull(dr.Item(5)), 0, CInt(dr.Item(5))),
                                                                        .Autorizador = If(IsDBNull(dr.Item(6)), "", dr.Item(6)),
                                                                        .Bodegas = listStok}
                    produList.Add(ingre)

                Next
            Catch ex As Exception
                Return String.Format("Error SQL: {0}", ex.Message)
            Finally
                cmd.Connection.Close()
            End Try
            Return produList
        End Function


        Public Function GetSalidasDetalle(numBodegas As Integer) As Object
            Dim cmd As New SqlClient.SqlCommand("spGetSalidasDetalle")
            Dim produList As New List(Of SalidasGralResultSet)
            cmd.Connection = Database.Connection
            Try
                cmd.CommandType = CommandType.StoredProcedure
                Dim adapter As New SqlClient.SqlDataAdapter(cmd)

                Dim bodegas As New DataSet
                adapter.Fill(bodegas)
                For Each dr As DataRow In bodegas.Tables(0).Rows
                    Dim listStok As New List(Of String)
                    For i As Integer = 7 To numBodegas + 6
                        Dim stock As String = If(IsDBNull(dr.Item(i)), "0", dr.Item(i))
                        listStok.Add(stock)
                    Next
                    Dim salidas As New SalidasGralResultSet With {.ID = If(IsDBNull(dr.Item(0)), "", dr.Item(0)),
                                                                        .Fecha = If(IsDBNull(dr.Item(1)), Nothing, dr.Item(1)),
                                                                        .Nombre = If(IsDBNull(dr.Item(2)), "", dr.Item(2)),
                                                                        .TipoDocumento = If(IsDBNull(dr.Item(3)), "", dr.Item(3)),
                                                                        .NumeroDocumento = If(IsDBNull(dr.Item(4)), "", dr.Item(4)),
                                                                        .Cantidad = If(IsDBNull(dr.Item(5)), 0, CInt(dr.Item(5))),
                                                                        .Autorizador = If(IsDBNull(dr.Item(6)), "", dr.Item(6)),
                                                                        .Bodegas = listStok}
                    produList.Add(salidas)

                Next
            Catch ex As Exception
                Return String.Format("Error SQL: {0}", ex.Message)
            Finally
                cmd.Connection.Close()
            End Try
            Return produList
        End Function

    End Class
End Namespace

