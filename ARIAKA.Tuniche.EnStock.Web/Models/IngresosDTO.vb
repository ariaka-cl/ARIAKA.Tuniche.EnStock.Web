Namespace Models
    Public Class IngresosDTO
        Public Property ID As Integer
        Public Property ProuctoID As Integer
        Public Property Direccion As String
        Public Property Fecha As String
        Public Property PrecioUnitario As Double
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
        Public Property Proveedor As ProveedorDTO
        Public Property Stock As Integer
        Public Property Producto As Models.ProductosDTO
        Public Property DetalleStock As List(Of Models.StockProductosDTO)
        Public Property AutorizadorID As String

    End Class
End Namespace
