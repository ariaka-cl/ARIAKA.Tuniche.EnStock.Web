Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_bodega_names
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Productos", "StockActualPalmas", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "StockActualMercedes", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "BodegaPalmas", Function(c) c.String())
            AddColumn("dbo.Productos", "BodegaMercedes", Function(c) c.String())
            DropColumn("dbo.Productos", "StockActual1")
            DropColumn("dbo.Productos", "StockActual2")
            DropColumn("dbo.Productos", "Bodega1")
            DropColumn("dbo.Productos", "Bodega2")
        End Sub
        
        Public Overrides Sub Down()
            AddColumn("dbo.Productos", "Bodega2", Function(c) c.String())
            AddColumn("dbo.Productos", "Bodega1", Function(c) c.String())
            AddColumn("dbo.Productos", "StockActual2", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "StockActual1", Function(c) c.Int(nullable := False))
            DropColumn("dbo.Productos", "BodegaMercedes")
            DropColumn("dbo.Productos", "BodegaPalmas")
            DropColumn("dbo.Productos", "StockActualMercedes")
            DropColumn("dbo.Productos", "StockActualPalmas")
        End Sub
    End Class
End Namespace
