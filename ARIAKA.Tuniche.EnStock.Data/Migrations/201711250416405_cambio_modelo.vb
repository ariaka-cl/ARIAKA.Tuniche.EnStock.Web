Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class cambio_modelo
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.Bodegas",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String(),
                        .Stock = c.Int(nullable := False),
                        .Productos_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Productos", Function(t) t.Productos_ID) _
                .Index(Function(t) t.Productos_ID)
            
            AddColumn("dbo.Productos", "StockMinimo", Function(c) c.String())
            AddColumn("dbo.Productos", "StockActual", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Transaccions", "PrecioUnitario", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Transaccions", "Descuento", Function(c) c.Double(nullable := False))
            AddColumn("dbo.Transaccions", "TipoDocumento", Function(c) c.String())
            AddColumn("dbo.Transaccions", "NumeroDocumento", Function(c) c.String())
            AlterColumn("dbo.Productos", "Tipo", Function(c) c.String())
            DropColumn("dbo.Productos", "Stock")
            DropColumn("dbo.Productos", "StockActualPalmas")
            DropColumn("dbo.Productos", "StockActualMercedes")
            DropColumn("dbo.Productos", "BodegaPalmas")
            DropColumn("dbo.Productos", "BodegaMercedes")
            DropColumn("dbo.Productos", "PrecioUnitario")
            DropColumn("dbo.Productos", "TipoDocumento")
            DropColumn("dbo.Productos", "NumeroDocumento")
        End Sub
        
        Public Overrides Sub Down()
            AddColumn("dbo.Productos", "NumeroDocumento", Function(c) c.String())
            AddColumn("dbo.Productos", "TipoDocumento", Function(c) c.String())
            AddColumn("dbo.Productos", "PrecioUnitario", Function(c) c.String())
            AddColumn("dbo.Productos", "BodegaMercedes", Function(c) c.String())
            AddColumn("dbo.Productos", "BodegaPalmas", Function(c) c.String())
            AddColumn("dbo.Productos", "StockActualMercedes", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "StockActualPalmas", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "Stock", Function(c) c.String())
            DropForeignKey("dbo.Bodegas", "Productos_ID", "dbo.Productos")
            DropIndex("dbo.Bodegas", New String() { "Productos_ID" })
            AlterColumn("dbo.Productos", "Tipo", Function(c) c.Int(nullable := False))
            DropColumn("dbo.Transaccions", "NumeroDocumento")
            DropColumn("dbo.Transaccions", "TipoDocumento")
            DropColumn("dbo.Transaccions", "Descuento")
            DropColumn("dbo.Transaccions", "PrecioUnitario")
            DropColumn("dbo.Productos", "StockActual")
            DropColumn("dbo.Productos", "StockMinimo")
            DropTable("dbo.Bodegas")
        End Sub
    End Class
End Namespace
