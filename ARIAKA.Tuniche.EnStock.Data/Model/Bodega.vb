Namespace Model
    Public Class Bodega
        Public Property ID As Integer
        Public Property Nombre As String

        Public Overridable Property StockProducto As List(Of StockProductos)
    End Class
End Namespace
