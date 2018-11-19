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

    Public Class DetalleIngresosDTO
        Public Property ID As Integer
        Public Property Fecha As Date
        Public Property Cantidad As Integer
        Public Overridable Property Bodega As BodegaDTO
        Public Overridable Property Ingresos As IngresosDTO
    End Class
End Namespace
