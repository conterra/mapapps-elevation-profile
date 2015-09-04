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