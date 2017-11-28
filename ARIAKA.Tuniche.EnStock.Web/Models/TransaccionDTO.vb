Namespace Models
    Public Class TransaccionDTO
        Public Property ID As Integer
        Public Property Producto As ProductosDTO
        Public Property Direccion As String
        Public Property Autorizador As UsuariosDTO
        Public Property Fecha As Date
        Public Property PrecioUnitario As Integer
        Public Property Descuento As Double
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
    End Class
End Namespace
