Namespace Models
    Public Class BodegaDTO
        Public Property ID As Integer
        Public Property Nombre As String
    End Class
    Public Class BodegaTraspasoDTO
        Public Property ID As Integer
        Public Property Bodega As BodegaDTO
        Public Property Stock As Integer
    End Class
    Public Class ProductosGrlBodegasDTO
        Public Property Codigo As String
        Public Property Bodega As BodegaDTO
        Public Property Stock As Integer
    End Class
End Namespace
