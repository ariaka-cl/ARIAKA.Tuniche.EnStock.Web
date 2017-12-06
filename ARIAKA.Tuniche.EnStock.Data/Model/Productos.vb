Namespace Model
    Public Class Productos
        Public Property ID As Integer
        Public Property Codigo As String
        Public Property StockMinimo As String
        Public Property Nombre As String
        Public Property Unidad As String
        Public Property Tipo As String
        Public Property Entrada As Integer
        Public Property Salida As Integer
        Public Property StockActual As Integer

        Public Property Comentario As String
        Public Property Categorias As Categorias

        Public Overridable Property StockProducto As List(Of StockProductos)

    End Class
End Namespace
