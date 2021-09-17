# Elevation Profile Bundle
This bundle enables the Elevation Profile Widget from Esri (new in ArcGIS API for JavaScript 3.14 ) in map.apps. It allows a user to input either a polyline or a freehand polyline and calculates an elevation profile along this line.

Installation Guide
------------------
**Requirement: map.apps 3.2.1**
- Add the "dn_elevationprofile" bundle to your app.
- Add the elevation profile service url (https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer) to the allowed server urls in your application.properties-file.
- Add the elevation profile tool to any specified toolset in your app.json-file (id=elevationProfileTool).

#### Configurable Components:

##### ElevationProfileWidgetFactory:
```
"ElevationProfileWidgetFactory": {
    "unit": "esriMeters",
    "profileTaskUrl": "https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer",
    "geometryServiceUrl": "https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
    "chartOptions": {
        "title": "H\u00f6henprofil",
        "chartTitleFontSize": 12,
        "axisTitleFontSize": 10,
        "axisLabelFontSize": 8,
        "indicatorFontColor": "#eee",
        "indicatorFillColor": "#666",
        "busyIndicatorBackgroundColor": "#666",
        "titleFontColor": "#eee",
        "axisFontColor": "#ccc",
        "axisMajorTickColor": "#333",
        "skyTopColor": "#B0E0E6",
        "skyBottomColor": "#4682B4",
        "waterLineColor": "#eee",
        "waterTopColor": "#ADD8E6",
        "waterBottomColor": "#0000FF",
        "elevationLineColor": "#D2B48C",
        "elevationTopColor": "#8B4513",
        "elevationBottomColor": "#CD853F",
        "elevationMarkerStrokeColor": "#FF0000",
        "elevationMarkerSymbol": "m -6 -6, l 12 12, m 0 -12, l -12 12"
    },
    "displayUnits": [ "esriMeters", "esriKilometers" ],
    "lineOptions": {
        "type": "esriSLS",
        "style": "esriSLSSolid",
        "color": [
            255,
            255,
            0
        ],
        "width": 2
    }
}
```

###### Properties
| Property                       | Type    | Possible Values                 | Default                                                                                                    | Description                       |
|--------------------------------|---------|---------------------------------|------------------------------------------------------------------------------------------------------------|---------------------------------- |
| unit                           | String  |                                 | ```esriMeters```                                                                                           | Activated unit to start with. Needs to be one of _displayUnits_      |
| profileTaskUrl                 | String  |                                 | ```https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer```                       | URL to Elevation GP Service       |
| geometryServiceUrl             | String  |                                 | ```https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer```                        | URL to Geometry Service           |
| chartOptions                   | Object  |                                 | [ElevationProfile](https://developers.arcgis.com/javascript/3/jsapi/elevationprofile-amd.html)             | Chart options                     |
| lineOptions                    | Object  |                                 | [CartographicLineSymbol](https://developers.arcgis.com/javascript/3/jsapi/cartographiclinesymbol-amd.html) | Line options                      |
| displayUnits                   | Array   | ```"esriMiles", "esriKilometers", "esriMeters", "esriNauticalMiles", "esriYards", "esriFeet"```| See _← Possible Values_                           | Limit the unit options            | 

Development Guide
------------------
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`

