[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-elevation-profile/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-elevation-profile/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/requires_map.apps-4.20.0-e5e5e5?labelColor=%233E464F&logoColor=%23e5e5e5)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.20.0-%20?labelColor=%233E464F&color=%232FC050)

# Elevation Profile
This bundle enables the ElevationProfile Widget from Esri (new in ArcGIS API for JavaScript 4.18) in map.apps. It allows a user to input a polyline and calculates an elevation profile along this line.

![Screenshot App](https://github.com/conterra/mapapps-elevation-profile/blob/main/screenshot.JPG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/public_demo_elevationprofile/index.html

## Installation Guide
**Requirements:**
- map.apps 4.11.0 or later

[dn_elevationprofile Documentation](https://github.com/conterra/mapapps-elevation-profile/tree/master/src/main/js/bundles/dn_elevationprofile)

## Quick start

Clone this project and ensure that you have all required dependencies installed correctly (see [Documentation](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/set-up-development-environment.html)).

Then run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```
