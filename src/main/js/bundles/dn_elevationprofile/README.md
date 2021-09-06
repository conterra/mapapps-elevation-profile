# dn_elevationprofile

This bundle enables the Elevation Profile Widget from Esri (new in ArcGIS API for JavaScript 3.14 ) in map.apps. It allows a user to input either a polyline or a freehand polyline and calculates an elevation profile along this line.

## Usage
Simply add the bundle "dn_elevationprofile" to your app.

To make the functions of this bundle available to the user, the following tool can be added to a toolset:

| Tool ID                    | Component                  | Description              |
|----------------------------|----------------------------|--------------------------|
| elevationProfileToggleTool | ElevationProfileToggleTool | Show or hide the widget. |

## Configuration Reference

More information about the configuration can be found in the Esri documentation:

https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-ElevationProfile.html

```json
"dn_elevationprofile": {
    "Config": {
        "geodesicDistanceThreshold": 100000,
        "profiles": [
            {
                "type": "ground"
            }
        ],
        "unit": "meters",
        "unitOptions": [
            "meters",
            "kilometers",
            "feet"
        ],
        "visibleElements": {
            "legend": true,
            "chart": true,
            "clearButton": true,
            "settingsButton": true,
            "sketchButton": true,
            "selectButton": false,
            "uniformChartScalingToggle": true
        }
    }
}
```
