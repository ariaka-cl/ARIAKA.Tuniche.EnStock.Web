Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class initial_migration
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.Categorias",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String()
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            CreateTable(
                "dbo.Productos",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Codigo = c.String(),
                        .Stock = c.String(),
                        .Nombre = c.String(),
                        .Unidad = c.String(),
                        .Tipo = c.Int(nullable := False),
                        .Entrada = c.Int(nullable := False),
                        .Salida = c.Int(nullable := False),
                        .StockActual = c.Int(nullable := False),
                        .Comentario = c.String(),
                        .Bodega = c.String(),
                        .Categorias_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Categorias", Function(t) t.Categorias_ID) _
                .Index(Function(t) t.Categorias_ID)
            
            CreateTable(
                "dbo.Rols",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String()
                    }) _
                .PrimaryKey(Function(t) t.ID)
            
            CreateTable(
                "dbo.Transaccions",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Direccion = c.String(),
                        .Autorizador_ID = c.Int(),
                        .Producto_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Usuarios", Function(t) t.Autorizador_ID) _
                .ForeignKey("dbo.Productos", Function(t) t.Producto_ID) _
                .Index(Function(t) t.Autorizador_ID) _
                .Index(Function(t) t.Producto_ID)
            
            CreateTable(
                "dbo.Usuarios",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Nombre = c.String(),
                        .Run = c.String(),
                        .NickName = c.String(),
                        .Password = c.String(),
                        .Rol_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Rols", Function(t) t.Rol_ID) _
                .Index(Function(t) t.Rol_ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.Transaccions", "Producto_ID", "dbo.Productos")
            DropForeignKey("dbo.Transaccions", "Autorizador_ID", "dbo.Usuarios")
            DropForeignKey("dbo.Usuarios", "Rol_ID", "dbo.Rols")
            DropForeignKey("dbo.Productos", "Categorias_ID", "dbo.Categorias")
            DropIndex("dbo.Usuarios", New String() { "Rol_ID" })
            DropIndex("dbo.Transaccions", New String() { "Producto_ID" })
            DropIndex("dbo.Transaccions", New String() { "Autorizador_ID" })
            DropIndex("dbo.Productos", New String() { "Categorias_ID" })
            DropTable("dbo.Usuarios")
            DropTable("dbo.Transaccions")
            DropTable("dbo.Rols")
            DropTable("dbo.Productos")
            DropTable("dbo.Categorias")
        End Sub
    End Class
End Namespace
