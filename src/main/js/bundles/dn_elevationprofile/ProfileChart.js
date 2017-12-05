define(["dojo/_base/lang", "dojo/on", "dojo/mouse", "dojo/_base/array", "dojo/number", "dojo/dom-geometry", "dojo/aspect", "esri/dijit/ElevationProfile/ProfileChart", "esri/sniff", "dojox/charting/action2d/MouseIndicator", "dojox/charting/action2d/TouchIndicator"],
    function (d_lang, on, d_mouse, d_array, d_number, dom_geometry, d_aspect, ProfileChart, sniff, MouseIndicator, TouchIndicator) {

    d_lang.extend(ProfileChart, {
        _updateIndicators: function () {
            if (this._chart) {
                this._clearIndicators();
                var t = {places: 1}, o = {
                    series: this.SERIES_NAME_ELEVATION,
                    mouseOver: !0,
                    font: "normal normal bold 8pt Tahoma",
                    fontColor: this._chartRenderingOptions.indicatorFontColor,
                    fill: this._chartRenderingOptions.indicatorFillColor,
                    offset: {y: 25, x: 30},
                    markerFill: "none",
                    markerStroke: {color: this._chartRenderingOptions.elevationMarkerStrokeColor, width: 3},
                    markerSymbol: this._chartRenderingOptions.elevationMarkerSymbol,
                    labelFunc: d_lang.hitch(this, function (i) {
                        this._displayChartLocation(i.x);
                        var e = this._unitConversion.getAbbrLabel(this._elevationUnits), o = d_number.format(i.y, t);
                        return d_lang.replace("{0} {1}", [o, e])
                    })
                }, s = {
                    series: this.SERIES_NAME_WATER,
                    mouseOver: !0,
                    font: "normal normal bold 8pt Tahoma",

                    // PATCH: readability of the font should always be granted (e.g. a black font color on red bg isn't good, right?)
                    fontColor: "#EEE",
                    fill: this._chartRenderingOptions.indicatorFillColor,
                    fillFunc: d_lang.hitch(this, function (t) {
                        var i = this._profileResults.distances.indexOf(t.x);
                        if (-1 !== i) {
                            var e = this._profileResults.elevations[i].y, o = this._profileResults.elevations[0].y;
                            return e >= o ? "green" : "red"
                        }
                        return "red"
                    }),
                    offset: {y: 45, x: 30},
                    labelFunc: d_lang.hitch(this, function (i) {
                        var e = this._profileResults.distances.indexOf(i.x);
                        if (-1 !== e) {
                            var o = this._profileResults.elevations[e].y, s = this._profileResults.elevations[0].y,
                                n = d_number.format(o - s, t), l = o - s > 0 ? "+" : "";

                            // PATCH: add the units to the label
                            var unit = this._unitConversion.getAbbrLabel(this._elevationUnits);
                            return d_lang.replace("{0}{1} {2}", [l, n, unit])
                        }
                        return "0.0"
                    })
                };
                this._posIndicator = d_lang.clone(s), s.offset = {y: 45, x: -30}, this._negIndicator = d_lang.clone(s);
                var l = {
                    series: this.SERIES_NAME_DISTANCE,
                    mouseOver: !0,
                    font: "normal normal bold 8pt Tahoma",
                    fontColor: this._chartRenderingOptions.indicatorFontColor,
                    fill: this._chartRenderingOptions.indicatorFillColor,
                    offset: {y: 0, x: 0},
                    labelFunc: d_lang.hitch(this, function (i) {
                        var e = this._unitConversion.getAbbrLabel(this._distanceUnits);
                        return d_lang.replace("{0} {1}", [d_number.format(i.x, t), e])
                    })
                };
                sniff("has-touch") ? (this._elevationDiffIndicator = new TouchIndicator(this._chart, "default", s), this._elevationIndicator = new TouchIndicator(this._chart, "default", o), this._distanceIndicator = new TouchIndicator(this._chart, "default", l), on(this.domNode, d_mouse.enter, d_lang.hitch(this, this._displayChartLocation, null)), on(this.domNode, d_mouse.leave, d_lang.hitch(this, this._displayChartLocation, null))) : (this._elevationDiffIndicator = new MouseIndicator(this._chart, "default", s), this._elevationIndicator = new MouseIndicator(this._chart, "default", o), this._distanceIndicator = new MouseIndicator(this._chart, "default", l)), this._chart.fullRender(), on(this._chart.node, "mouseover", d_lang.hitch(this, function (t) {
                    var i = dom_geometry.position(this._chart.node, !1);
                    i.w - t.clientX < 100 ? d_array.forEach([this._elevationDiffIndicator, this._elevationIndicator], function (t) {
                        t && t.opt.offset.x > 0 && (t.opt.offset = {y: t.opt.offset.y, x: -t.opt.offset.x})
                    }, this) : d_array.forEach([this._elevationDiffIndicator, this._elevationIndicator], function (t) {
                        t && t.opt.offset.x < 0 && (t.opt.offset = {y: t.opt.offset.y, x: Math.abs(t.opt.offset.x)})
                    }, this)
                }))
            }
        }
    })



    }
);
