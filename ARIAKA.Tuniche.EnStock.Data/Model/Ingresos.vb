Namespace Model
    Public Class Ingresos
        Public Property ID As Integer
        Public Property Producto As Productos
        Public Property Direccion As String
        Public Property Fecha As Date
        Public Property PrecioUnitario As Double
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
        Public Property Proveedor As Proveedor
        Public Property Cantidad As Integer
        Public Overridable Property Autorizador As Usuario

        Public Overridable Property DetalleIngresos As List(Of DetalleIngresos)
    End Class
End Namespace
