# Elevation Profile Bundle
This bundle enables the Elevation Profile Widget from Esri (new in ArcGIS API for JavaScript 3.14 ) in map.apps. It allows a user to input either a polyline or a freehand geometry and calculates an elevation profile along this line.

### Sample App ###
http://www.mapapps.de/mapapps/resources/apps/downloads_elevationprofile/index.html

### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`

Installation Guide
------------------
**Requirement: map.apps 3.2.1**
- Add the "dn_elevationprofile" bundle to your app.
- Add the elevation profile service url (https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer) to the allowed server urls in your application.properties-file.
- Add the elevation profile tool to any specified toolset in your app.json-file (id=elevationProfileTool).
