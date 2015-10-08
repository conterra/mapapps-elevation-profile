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
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/form/TextBox",
    "dijit/form/CheckBox",
    "dijit/form/Button",
    "dojo/text!./templates/ElevationProfileWidget.html",
    "dijit/form/Select",
    "esri/toolbars/draw",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/CartographicLineSymbol",
    "esri/graphic",
    "esri/units",
    "esri/dijit/ElevationProfile",
    "esri/Color",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
], function (declare,
             _Widget,
             _TemplatedMixin,
             _WidgetsInTemplateMixin,
             TextBox,
             CheckBox,
             Button,
             templateStringContent,
             Select,
             Draw,
             SimpleLineSymbol,
             CartographicLineSymbol,
             Graphic,
             Units,
             ElevationsProfileWidget,
             Color, dom, on) {
    return declare([_Widget, _TemplatedMixin,
        _WidgetsInTemplateMixin], {
        templateString: templateStringContent,
        postCreate: function () {
            this.inherited(arguments);
            var props = this.properties;
            var unit = this.unit = props.unit;
            this._comboboxNode.set("value", this.unit);
        },
        startup: function () {
            this.inherited(arguments);
            this._init();
        },
        _onPolyline: function () {
            this.type = "polyline";
            this._initToolbar("polyline");
        },
        _onFreehandPolyline: function () {
            this.type = "freehandpolyline";
            this._initToolbar("freehandpolyline");
        },
        _clear: function () {
            var toolbar = this.tb;
            toolbar && toolbar.deactivate();
            this.map.graphics.remove(this.graphic);
            this.epWidget.clearProfile(); //Clear profile
        },
        _init: function () {
            on(this._comboboxNode, "change", function (evt) {
                var epWidget = this.epWidget;
                if (epWidget) {
                    epWidget.set("measureUnits", evt);
                }
            }.bind(this));

            // lineSymbol used for freehand polyline and line.
            this.lineSymbol = this.linesymbol = new CartographicLineSymbol(
                CartographicLineSymbol.STYLE_SOLID,
                new Color([255, 0, 0]), 2,
                CartographicLineSymbol.CAP_ROUND,
                CartographicLineSymbol.JOIN_MITER, 2
            );
            var unit = this.unit;
            var profileParams = {
                map: this.map,
                profileTaskUrl: "https://elevation.arcgis.com/arcgis/rest/services/Tools/ElevationSync/GPServer",
                scalebarUnits: unit
            };

            this.epWidget = new ElevationsProfileWidget(profileParams, this._profileChartNode);
            this.epWidget.startup();
            on(this.epWidget, "load", function (evt) {
                this._setProcessing(false);
            });
        },
        _initToolbar: function (toolname) {
            this.epWidget.clearProfile(); //Clear profile
            this.map.graphics.clear();
            this.tb = new Draw(this.map);
            this.tb.on("draw-end", this._addGraphic.bind(this));
            this.tb.activate(toolname);
            if (toolname === "freehandpolyline") {
                this.map.disableMapNavigation();
            }
        },
        _addGraphic: function (evt) {
            this._setProcessing(true);
            //deactivate the toolbar and clear existing graphics
            this.tb.deactivate();
            this.map.enableMapNavigation();
            var symbol = this.lineSymbol;
            this.graphic = this.map.graphics.add(new Graphic(evt.geometry, symbol));
            var epWidget = this.epWidget;
            epWidget.set("profileGeometry", evt.geometry);
            on(epWidget, "update-profile", function (evt) {
                this._setProcessing(false);
            }.bind(this));
        },
        _setUnitAttr: function (unit) {
            this.unit = unit;
            this._comboboxNode.set("value", unit);
        },
        _setProcessing: function (processing) {
            var tool = this.tool;
            if (tool) {
                tool.set("processing", processing);
            }
        }
    });
});