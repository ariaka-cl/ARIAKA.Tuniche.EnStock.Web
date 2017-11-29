Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class edit_model_final
        Inherits DbMigration
    
        Public Overrides Sub Up()
            DropForeignKey("dbo.Transaccions", "Autorizador_ID", "dbo.Usuarios")
            DropForeignKey("dbo.Transaccions", "Producto_ID", "dbo.Productos")
            DropIndex("dbo.Transaccions", New String() { "Autorizador_ID" })
            DropIndex("dbo.Transaccions", New String() { "Producto_ID" })
            CreateTable(
                "dbo.Bodegas",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String()
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            CreateTable(
                "dbo.SubCategorias",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String(),
                        .Categorias_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Categorias", Function(t) t.Categorias_ID) _
                .Index(Function(t) t.Categorias_ID)
            
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
            
            CreateTable(
                "dbo.Proveedors",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String()
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            CreateTable(
                "dbo.Salidas",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Fechas = c.DateTime(nullable := False),
                        .TipoDocumentoa = c.String(),
                        .NumeroDocumento = c.String(),
                        .Cantidad = c.Double(nullable := False),
                        .Autorizador_ID = c.Int(),
                        .Producto_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Usuarios", Function(t) t.Autorizador_ID) _
                .ForeignKey("dbo.Productos", Function(t) t.Producto_ID) _
                .Index(Function(t) t.Autorizador_ID) _
                .Index(Function(t) t.Producto_ID)
            
            CreateTable(
                "dbo.Ingresos",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Direccion = c.String(),
                        .Fecha = c.DateTime(nullable := False),
                        .PrecioUnitario = c.Double(nullable := False),
                        .TipoDocumento = c.String(),
                        .NumeroDocumento = c.String(),
                        .Producto_ID = c.Int(),
                        .Proveedor_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Productos", Function(t) t.Producto_ID) _
                .ForeignKey("dbo.Proveedors", Function(t) t.Proveedor_ID) _
                .Index(Function(t) t.Producto_ID) _
                .Index(Function(t) t.Proveedor_ID)
            
            AddColumn("dbo.Productos", "StockMinimo", Function(c) c.String())
            AddColumn("dbo.Productos", "StockActual", Function(c) c.Int(nullable := False))
            AlterColumn("dbo.Productos", "Tipo", Function(c) c.String())
            DropColumn("dbo.Productos", "Stock")
            DropColumn("dbo.Productos", "StockActualPalmas")
            DropColumn("dbo.Productos", "StockActualMercedes")
            DropColumn("dbo.Productos", "BodegaPalmas")
            DropColumn("dbo.Productos", "BodegaMercedes")
            DropColumn("dbo.Productos", "PrecioUnitario")
            DropColumn("dbo.Productos", "TipoDocumento")
            DropColumn("dbo.Productos", "NumeroDocumento")
            DropTable("dbo.Transaccions")
        End Sub
        
        Public Overrides Sub Down()
            CreateTable(
                "dbo.Transaccions",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Direccion = c.String(),
                        .Fecha = c.DateTime(nullable := False),
                        .Autorizador_ID = c.Int(),
                        .Producto_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            AddColumn("dbo.Productos", "NumeroDocumento", Function(c) c.String())
            AddColumn("dbo.Productos", "TipoDocumento", Function(c) c.String())
            AddColumn("dbo.Productos", "PrecioUnitario", Function(c) c.String())
            AddColumn("dbo.Productos", "BodegaMercedes", Function(c) c.String())
            AddColumn("dbo.Productos", "BodegaPalmas", Function(c) c.String())
            AddColumn("dbo.Productos", "StockActualMercedes", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "StockActualPalmas", Function(c) c.Int(nullable := False))
            AddColumn("dbo.Productos", "Stock", Function(c) c.String())
            DropForeignKey("dbo.Ingresos", "Proveedor_ID", "dbo.Proveedors")
            DropForeignKey("dbo.Ingresos", "Producto_ID", "dbo.Productos")
            DropForeignKey("dbo.Salidas", "Producto_ID", "dbo.Productos")
            DropForeignKey("dbo.Salidas", "Autorizador_ID", "dbo.Usuarios")
            DropForeignKey("dbo.StockProductos", "Producto_ID", "dbo.Productos")
            DropForeignKey("dbo.StockProductos", "Bodega_ID", "dbo.Bodegas")
            DropForeignKey("dbo.SubCategorias", "Categorias_ID", "dbo.Categorias")
            DropIndex("dbo.Ingresos", New String() { "Proveedor_ID" })
            DropIndex("dbo.Ingresos", New String() { "Producto_ID" })
            DropIndex("dbo.Salidas", New String() { "Producto_ID" })
            DropIndex("dbo.Salidas", New String() { "Autorizador_ID" })
            DropIndex("dbo.StockProductos", New String() { "Producto_ID" })
            DropIndex("dbo.StockProductos", New String() { "Bodega_ID" })
            DropIndex("dbo.SubCategorias", New String() { "Categorias_ID" })
            AlterColumn("dbo.Productos", "Tipo", Function(c) c.Int(nullable := False))
            DropColumn("dbo.Productos", "StockActual")
            DropColumn("dbo.Productos", "StockMinimo")
            DropTable("dbo.Ingresos")
            DropTable("dbo.Salidas")
            DropTable("dbo.Proveedors")
            DropTable("dbo.StockProductos")
            DropTable("dbo.SubCategorias")
            DropTable("dbo.Bodegas")
            CreateIndex("dbo.Transaccions", "Producto_ID")
            CreateIndex("dbo.Transaccions", "Autorizador_ID")
            AddForeignKey("dbo.Transaccions", "Producto_ID", "dbo.Productos", "ID")
            AddForeignKey("dbo.Transaccions", "Autorizador_ID", "dbo.Usuarios", "ID")
        End Sub
    End Class
End Namespace
