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
        Public Property Transicioneos As DbSet(Of Ingresos)
        Public Property Bodegaeos As DbSet(Of Bodega)
        Public Property Salidaeos As DbSet(Of Salidas)
        Public Property Proveedoreos As DbSet(Of Proveedor)
        Public Property SubCategoriaeos As DbSet(Of SubCategoria)

        Public Sub New()
            MyBase.New("name=bdTunicheContext")
        End Sub

        Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
            MyBase.OnModelCreating(modelBuilder)
        End Sub

    End Class
End Namespace

