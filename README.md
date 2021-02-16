# Elevation Profile
This bundle enables the ElevationProfile Widget from Esri (new in ArcGIS API for JavaScript 4.18) in map.apps. It allows a user to input a polyline and calculates an elevation profile along this line.

![Screenshot App](https://github.com/conterra/mapapps-elevation-profile/blob/master/screenshot.JPG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_elevationprofile4/index.html

## Installation Guide
**Requirements:**
- map.apps 4.11.0 or later

Simply add the bundle "dn_elevationprofile" to your app.

[dn_elevationprofile Documentation](https://github.com/conterra/mapapps-elevation-profile/tree/master/src/main/js/bundles/dn_elevationprofile)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
