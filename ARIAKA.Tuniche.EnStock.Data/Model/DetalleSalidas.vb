Namespace Model
    Public Class DetalleSalidas
        Public Property ID As Integer
        Public Property Fecha As Date
        Public Property Cantidad As Integer
        Public Overridable Property Bodega As Bodega
        Public Overridable Property Salidas As Salidas
    End Class
End Namespace
