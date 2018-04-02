Namespace Model
    Public Class DetalleIngresos
        Public Property ID As Integer
        Public Property Fecha As Date
        Public Property Cantidad As Integer
        Public Overridable Property Bodega As Bodega
        Public Overridable Property Ingresos As Ingresos
    End Class
End Namespace
