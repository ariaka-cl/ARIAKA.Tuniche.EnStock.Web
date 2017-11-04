Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web.Http
Imports Newtonsoft.Json.Serialization

Public Module WebApiConfig
    Public Sub Register(config As HttpConfiguration)
        config.MapHttpAttributeRoutes()
        config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = New CamelCasePropertyNamesContractResolver()
        config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(New Newtonsoft.Json.Converters.IsoDateTimeConverter() With {.DateTimeFormat = "yyyy-MM-ddTHH:mmZ"})

    End Sub
End Module
