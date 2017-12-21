Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_subcategoria_colummn
        Inherits DbMigration
    
        Public Overrides Sub Up()
            RenameColumn(table := "dbo.SubCategorias", name := "Categorias_ID", newName := "Categoria_ID")
            RenameIndex(table := "dbo.SubCategorias", name := "IX_Categorias_ID", newName := "IX_Categoria_ID")
        End Sub
        
        Public Overrides Sub Down()
            RenameIndex(table := "dbo.SubCategorias", name := "IX_Categoria_ID", newName := "IX_Categorias_ID")
            RenameColumn(table := "dbo.SubCategorias", name := "Categoria_ID", newName := "Categorias_ID")
        End Sub
    End Class
End Namespace
