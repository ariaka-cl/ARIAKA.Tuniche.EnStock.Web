Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_bodega
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Productos", "StockActual1", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "StockActual2", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "Bodega1", Function(c) c.String())
            AddColumn("dbo.Productos", "Bodega2", Function(c) c.String())
            DropColumn("dbo.Productos", "StockActual")
            DropColumn("dbo.Productos", "Bodega")
        End Sub
        
        Public Overrides Sub Down()
            AddColumn("dbo.Productos", "Bodega", Function(c) c.String())
            AddColumn("dbo.Productos", "StockActual", Function(c) c.Int(nullable := False))
            DropColumn("dbo.Productos", "Bodega2")
            DropColumn("dbo.Productos", "Bodega1")
            DropColumn("dbo.Productos", "StockActual2")
            DropColumn("dbo.Productos", "StockActual1")
        End Sub
    End Class
End Namespace
