# Elevation Profile Bundle
This bundle enables the Elevation Profile Widget from Esri (new in ArcGIS API for JavaScript 3.14 ) in map.apps. It allows a user to input either a polyline or a freehand geometry and calculates an elevation profile along this line.

Installation Guide
------------------
**Requirement: map.apps 3.2.1**
- Add the "dn_elevationprofile" bundle to your app.
- Add the elevation profile service url (https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer) to the allowed server urls in your application.properties-file.
- Add the elevation profile tool to any specified toolset in your app.json-file (id=elevationProfileTool).
