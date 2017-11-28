Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_stock_producto
        Inherits DbMigration
    
        Public Overrides Sub Up()
            DropForeignKey("dbo.Bodegas", "Productos_ID", "dbo.Productos")
            DropIndex("dbo.Bodegas", New String() { "Productos_ID" })
            CreateTable(
                "dbo.StockProductos",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Stock = c.Int(nullable := False),
                        .Bodega_ID = c.Int(),
                        .Producto_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Bodegas", Function(t) t.Bodega_ID) _
                .ForeignKey("dbo.Productos", Function(t) t.Producto_ID) _
                .Index(Function(t) t.Bodega_ID) _
                .Index(Function(t) t.Producto_ID)
            
            DropColumn("dbo.Bodegas", "Stock")
            DropColumn("dbo.Bodegas", "Productos_ID")
        End Sub
        
        Public Overrides Sub Down()
            AddColumn("dbo.Bodegas", "Productos_ID", Function(c) c.Int())
            AddColumn("dbo.Bodegas", "Stock", Function(c) c.Int(nullable := False))
            DropForeignKey("dbo.StockProductos", "Producto_ID", "dbo.Productos")
            DropForeignKey("dbo.StockProductos", "Bodega_ID", "dbo.Bodegas")
            DropIndex("dbo.StockProductos", New String() { "Producto_ID" })
            DropIndex("dbo.StockProductos", New String() { "Bodega_ID" })
            DropTable("dbo.StockProductos")
            CreateIndex("dbo.Bodegas", "Productos_ID")
            AddForeignKey("dbo.Bodegas", "Productos_ID", "dbo.Productos", "ID")
        End Sub
    End Class
End Namespace
