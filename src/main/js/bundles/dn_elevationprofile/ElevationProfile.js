/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(["dojo/_base/lang", "esri/dijit/ElevationProfile", "esri/tasks/GeometryService", "esri/SpatialReference"],
    function (d_lang, ElevationProfile, GeometryService, SpatialReference) {
        d_lang.extend(ElevationProfile, {
            _setProfileGeometryAttr: function (path) {
                var gsUrl = this.geometryServiceUrl || "https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer";
                var gsvc = new GeometryService(gsUrl);
                var outSR = new SpatialReference(3857);
                var that = this;
                gsvc.project([path], outSR, function (projectedPoints) {
                    that.projectedPoints = projectedPoints;
                    path = projectedPoints[0];
                    path ? (that._map.setMapCursor("wait"), that._getProfile(path).then(d_lang.hitch(that, function (path) {
                        that._map.setMapCursor("default");
                        that._profileChart.update(path);
                        that.emit("update-profile", path)
                    }), d_lang.hitch(that, function (path) {
                        that._map.setMapCursor("default");
                        console.log(d_lang.replace("{message}\n\n{details.0}", path));
                        that.emit("error", path)
                    }))) : console.log("Null geometry. Unable to update profile")
                });
            }
        });
    }
);
