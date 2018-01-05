Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.Mvc
Imports System.Web.Routing

Public Module RouteConfig
    Public Sub RegisterRoutes(routes As RouteCollection)
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}")

        routes.MapMvcAttributeRoutes()

        routes.MapRoute(
           "Default",
           "{controller}/{action}/{id}",
           New With {.controller = "Login", .action = "Index", .id = UrlParameter.Optional}
       )

    End Sub
End Module