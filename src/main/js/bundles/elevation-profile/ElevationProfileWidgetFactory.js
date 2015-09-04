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
define([
    "dojo/_base/declare",
    "./ElevationProfileWidget"
], function (declare,
             ElevationProfileWidget) {
    return declare([], {
        activate: function () {
            this.inherited(arguments);
            var map = this._esriMap;
            var props = this._properties;
            var i18n = this._i18n.get();
            var tool = this._tool;
            var epw = this.epw = new ElevationProfileWidget({
                "map": map,
                "properties": props,
                "i18n": i18n,
                "tool": tool
            });
        },
        deactivate: function () {
            this.epw._clear();
        },
        createInstance: function () {
            return this.epw;
        },
        modified: function () {
            var props = this._properties;
            var unit = props.unit;
            this.epw.set("unit", unit);
        }

    });
});