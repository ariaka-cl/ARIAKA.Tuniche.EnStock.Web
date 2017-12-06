Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class edit_productos_transaccion
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Productos", "PrecioUnitario", Function(c) c.String())
            AddColumn("dbo.Productos", "TipoDocumento", Function(c) c.String())
            AddColumn("dbo.Productos", "NumeroDocumento", Function(c) c.String())
            AddColumn("dbo.Transaccions", "Fecha", Function(c) c.DateTime(nullable := False))
        End Sub
        
        Public Overrides Sub Down()
            DropColumn("dbo.Transaccions", "Fecha")
            DropColumn("dbo.Productos", "NumeroDocumento")
            DropColumn("dbo.Productos", "TipoDocumento")
            DropColumn("dbo.Productos", "PrecioUnitario")
        End Sub
    End Class
End Namespace
